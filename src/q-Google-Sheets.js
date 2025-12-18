import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml";
  const title = "Import HTML Table in Google Sheets";

  const answer = '=IMPORTHTML("https://example.com", "table", 1)';

  const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets formula imports the <strong>first HTML table</strong>
        from a webpage?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
