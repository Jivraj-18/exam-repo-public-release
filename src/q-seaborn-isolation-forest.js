import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 0.75 }) {
  const id = "q-seaborn-isolation-forest";
  const title = "Flag Outliers via IQR (EDA)";

  const rng = seedrandom(`${user.email}#${id}`);
  const values = Array.from({ length: 60 }, () => Number((rng() * 100).toFixed(2)));
  // Inject a few outliers
  values.push(250 + rng() * 50, -40 - rng() * 20);

  const sorted = values.slice().sort((a, b) => a - b);
  const q1 = sorted[Math.floor(0.25 * (sorted.length - 1))];
  const q3 = sorted[Math.floor(0.75 * (sorted.length - 1))];
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  const count = sorted.filter((v) => v < lower || v > upper).length;

  const answer = (input) => {
    const n = Number(String(input).trim());
    if (!Number.isFinite(n)) throw new Error("Enter a number");
    if (n !== count) throw new Error("Incorrect outlier count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        In a Seaborn EDA, one baseline method to flag outliers is the IQR rule.
        For the dataset below, how many values are outside <code>[Q1-1.5*IQR, Q3+1.5*IQR]</code>?
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(values)}</code></pre>
      <label for="${id}" class="form-label">Outlier count:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
