import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-scrape-table-index";
    const title = "IMPORTHTML Table Index";

    const answer = '=IMPORTHTML("URL","table",2)';

    const question = html`
    <div class="mb-3">
      <p>
        Which <strong>IMPORTHTML parameter</strong> imports the <strong>2nd table</strong>
        (index starts at 1) from a webpage instead of the first table?
      </p>
      <label for="${id}" class="form-label">Syntax:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
