import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-csv-sum";
    const title = "Calculate Sum from CSV Data";

    // Deterministic RNG based on user email
    const random = seedrandom(`${user.email}#${id}`);

    // Generate random items
    const items = ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Honeydew"];
    const rows = [];
    const numRows = 10 + Math.floor(random() * 10); // 10-19 rows
    let expectedSum = 0;

    for (let i = 0; i < numRows; i++) {
        const item = items[Math.floor(random() * items.length)];
        const cost = Math.floor(random() * 100) + 1;
        rows.push(`${item},${cost}`);
        expectedSum += cost;
    }

    const csvContent = "Item,Cost\n" + rows.join("\n");

    const answer = (input) => {
        const submission = Number(input.trim());
        if (isNaN(submission)) throw new Error("Input is not a number");
        if (Math.abs(submission - expectedSum) > 0.01) return false;
        return true;
    };

    const question = html`
    <div class="mb-3">
      <p>
        Calculate the sum of the <strong>Cost</strong> column in the following CSV data:
      </p>
      <pre style="white-space: pre-wrap; background-color: #f8f9fa; padding: 10px; border-radius: 5px; border: 1px solid #dee2e6;"><code>${csvContent}</code></pre>
      <label for="${id}" class="form-label">Total Cost:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
