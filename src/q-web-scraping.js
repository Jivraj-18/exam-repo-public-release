import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-google-importhtml";
  const title = "Import Table Using Google Sheets";

  const answer = '=IMPORTHTML("URL","table",1)';

  const question = html`
    <div class="mb-3">
      <p>
        Write the Google Sheets formula that imports the
        <strong>first table</strong> from a webpage URL.
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
