import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml-basic";
  const title = "Google Sheets IMPORTHTML";

  const answer = '=IMPORTHTML("https://en.wikipedia.org/wiki/List_of_countries_by_population","table",1)';

  const question = html`
    <div class="mb-3">
      <p>
        Write a Google Sheets formula using <code>IMPORTHTML</code> to import
        the <strong>first table</strong> from the Wikipedia page
        <em>List of countries by population</em>.
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}