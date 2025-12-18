import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-format";
  const title = "Tabular Data File Format";

  const answer = "CSV";

  const question = html`
    <div class="mb-3">
      <p>
        Which plain-text file format stores tabular data using
        <strong>commas as separators</strong> and is widely used
        for data sourcing?
      </p>
      <label for="${id}" class="form-label">File format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
