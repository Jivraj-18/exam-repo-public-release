import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-head";
  const title = "Preview CSV File";

  const answer = "head data.csv";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command displays the first 10 rows of a CSV file named
        <strong>data.csv</strong> to quickly inspect its contents?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
