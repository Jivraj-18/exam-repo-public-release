import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml";
  const title = "Google Sheets IMPORTHTML";

  const answer = "IMPORTHTML";

  const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets function is used to import
        tables or lists from a web page using a URL?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
