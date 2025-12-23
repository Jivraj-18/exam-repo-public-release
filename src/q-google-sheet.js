import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml-ducks";
  const title = "Google Sheets IMPORTHTML";

  const answer = '=IMPORTHTML("https://example.com/odi-page-7", "table", 1)';

  const question = html`
    <div class="mb-3">
      <p>
        In Google Sheets, which <strong>IMPORTHTML</strong> formula correctly
        imports the <strong>first table</strong> from the ODI batting
        statistics on page 7 at
        <code>https://example.com/odi-page-7</code>?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
