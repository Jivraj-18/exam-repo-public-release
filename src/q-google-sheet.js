import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-importhtml";
    const title = "Import Table into Google Sheets";

    const answer = '=IMPORTHTML("https://en.wikipedia.org/wiki/List_of_countries_by_population","table",1)';

    const question = html`
    <div class="mb-3">
      <p>
        Write a <strong>Google Sheets formula</strong> to import the
        <strong>first table</strong> from the Wikipedia page:
        <br />
        <code>https://en.wikipedia.org/wiki/List_of_countries_by_population</code>
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
