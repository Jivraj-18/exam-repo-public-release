import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-library";
  const title = "CSV Processing in Python";

  const answer = "pandas";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python library is most commonly used to
        <strong>load, filter, and aggregate CSV data</strong> efficiently?
      </p>
      <label for="${id}" class="form-label">Library:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
