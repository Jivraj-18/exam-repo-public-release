import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-23f2001072-4";
    const title = "Statistics: Median Calculation";

    // deterministic RNG
    const random = seedrandom(`${user.email}#${id}`);

    // Generate 7 to 9 random numbers between 1 and 20
    const count = 7 + Math.floor(random() * 3);
    const numbers = Array.from({ length: count }, () => Math.floor(1 + random() * 20));

    // Sort for calculation
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const expectedMedian = sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;

    const answer = (input) => {
        return parseFloat(input) === expectedMedian;
    };

    const question = html`
    <div class="mb-3">
      <p>Consider the following dataset:</p>
      <pre><code>[${numbers.join(", ")}]</code></pre>
      <p>What is the <strong>median</strong> of this dataset?</p>
      
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.5" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
