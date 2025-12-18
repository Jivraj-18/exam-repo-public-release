import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.25 }) {
  const id = "q-importhtml";
  const title = "Import HTML into Google Sheets";

  const answer = '=IMPORTHTML("https://en.wikipedia.org/wiki/List_of_countries_by_population","table",1)';

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Google Sheets formula</strong> imports the
        <strong>first table</strong> from a Wikipedia page?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
