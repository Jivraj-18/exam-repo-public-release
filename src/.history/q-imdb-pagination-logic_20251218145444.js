import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-imdb-pagination";
  const title = "IMDb Pagination Parameter";

  const answer = "start";

  const question = html`
    <div class="mb-3">
      <p>
        IMDb advanced search URLs use a query parameter to control
        <strong>pagination offsets</strong> (e.g., 1–50, 51–100).
        What is the name of this parameter?
      </p>
      <label for="${id}" class="form-label">Parameter name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
