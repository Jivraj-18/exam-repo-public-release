import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ weight = 1 }) {
  const id = "q-csv-column-sum";
  const title = "CSV Column Aggregation";

  const url = "https://sanand0.github.io/tdsdata/sample_numbers.csv";

  const question = html`
    <h4>CSV Processing</h4>
    <p>
      Download the CSV from:
      <code>${url}</code>
    </p>
    <ol>
      <li>Sum all values in column <strong>value</strong></li>
      <li>Return the total</li>
    </ol>

    <input class="form-control" id="${id}" />
  `;

  const answer = async (output) => {
    if (!output.match(/-?\d+(\.\d+)?/)) {
      throw new Error("Expected numeric sum");
    }
    return true;
  };

  return { id, title, weight, question, answer };
}
