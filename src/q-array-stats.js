import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-array-stats";
    const title = "Calculate Mean and Median";

    const random = seedrandom(`${user.email}#${id}`);

    // Generate 50 random integers between 0 and 100
    const numbers = Array.from({ length: 50 }, () => Math.floor(random() * 101));

    // Solve expected
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const mean = sum / sorted.length;

    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;

    const answer = (input) => {
        const res = JSON.parse(input);
        // Allow small float precision diffs
        const closeEnough = (a, b) => Math.abs(a - b) < 0.001;
        if (!closeEnough(res.mean, mean)) throw new Error(`Incorrect mean. Expected ${mean}, got ${res.mean}`);
        if (!closeEnough(res.median, median)) throw new Error(`Incorrect median. Expected ${median}, got ${res.median}`);
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Given the following list of numbers:
      </p>
      <pre style="white-space: pre-wrap; background: #f8f9fa; padding: 10px;"><code class="language-json">
${JSON.stringify(numbers)}
      </code></pre>
      <ol>
        <li>Calculate the <strong>mean</strong> (average).</li>
        <li>Calculate the <strong>median</strong>.</li>
        <li>Return the result as a JSON object in the format: <code>{"mean": 12.3, "median": 12}</code></li>
      </ol>
      <label for="${id}" class="form-label">Result JSON:</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
