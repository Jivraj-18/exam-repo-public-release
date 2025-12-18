import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml-basic";
  const title = "Google Sheets IMPORTHTML";

  const answer = '=IMPORTHTML(url, "table", 1)';

  const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets formula is used to import the
        <strong>first table</strong> from a web page?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
