import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-zscore-outlier";
  const title = "Python: Z-Score Outlier Detection";

  const rng = seedrandom(`${user.email}#${id}`);

  // ---------- Data Generation ----------
  const values = [];
  const n = 26;

  let outlierIndex = null;

  for (let i = 0; i < n; i++) {
    const base = 50 + rng() * 10;
    values.push(Math.round(base * 10) / 10);
  }

  // Inject a single structural outlier
  const injectAt = 10 + Math.floor(rng() * 8); // index 10–17
  values[injectAt] = Math.round((values[injectAt] + 40 + rng() * 20) * 10) / 10;
  outlierIndex = injectAt;

  // ---------- Answer Validation ----------
  const answer = async (response) => {
    if (!response) throw new Error("Enter the index of the outlier.");

    const idx = parseInt(response.trim(), 10);
    if (Number.isNaN(idx)) throw new Error("Enter a valid integer index.");

    if (idx !== outlierIndex) {
      throw new Error(
        "Identify the first data point whose absolute z-score exceeds 2.5."
      );
    }
    return true;
  };

  // ---------- Question UI ----------
  const question = html`
    <div class="mb-3">
      <h2>SignalWatch: Anomaly Identification</h2>

      <p>
        SignalWatch monitors system metrics and flags statistically significant
        anomalies. Analysts standardize readings to identify extreme deviations.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Load the numeric series into Python.</li>
        <li>Compute the mean and standard deviation.</li>
        <li>Compute z-scores for each value.</li>
        <li>
          Identify the <strong>first index</strong> where
          <code>|z| &gt; 2.5</code>.
        </li>
      </ol>

      <details class="mb-3">
        <summary>Numeric Series</summary>
        <pre>${JSON.stringify(values)}</pre>
      </details>

      <label for="${id}" class="form-label">
        What is the index of the first outlier?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. 13"
        required
      />

      <p class="text-muted">
        Hint: Use population standard deviation (<code>ddof=0</code>).
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
