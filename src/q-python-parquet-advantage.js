import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-python-parquet-advantage";
  const title = "Parquet vs CSV in Python";
  const answer = "Columnar storage and faster reads";

  const question = html`
    <div class="mb-3">
      <p>
        A dataset loads <strong>5× faster</strong> when switched from CSV
        to Parquet in Pandas.
        What is the <strong>primary reason</strong> for this improvement?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}