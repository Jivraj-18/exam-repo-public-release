import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-csv-sum-column";
    const title = "CSV Data Analysis";

    const random = seedrandom(`${user.email}#${id}`);
    const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
    const numRows = randInt(10, 20);

    // Generate CSV data
    const headers = ["id", "amount", "qty"];
    const rows = [];
    let expectedSum = 0;

    for (let i = 0; i < numRows; i++) {
        const val = randInt(10, 100);
        const qty = randInt(1, 10);
        rows.push([i + 1, val, qty]);
        expectedSum += val;
    }

    const csvContent = [headers.join(",")]
        .concat(rows.map(r => r.join(",")))
        .join("\n");

    const question = html`
    <div class="mb-3">
      <p>
        Calculate the sum of the <strong>amount</strong> column in the following CSV data:
      </p>
      <pre style="white-space: pre-wrap"><code>
${csvContent}
      </code></pre>
      <label for="${id}" class="form-label">Total Amount:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        if (parseInt(input) !== expectedSum) {
            throw new Error(`Incorrect. Expected ${expectedSum}`);
        }
        return true;
    };

    return { id, title, weight, question, answer };
}
