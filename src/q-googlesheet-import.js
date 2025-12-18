import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sheets-importhtml";
  const title = "Google Sheets Scraping Function";

  const answer = "IMPORTHTML";

  const question = html`
    <div class="mb-3">
      <p>
        In Google Sheets, which function is used to fetch a list or table 
        from within an HTML page using the syntax 
        <code>=FUNCTION(url, query, index)</code>?
      </p>
      <label for="${id}" class="form-label">Function Name (uppercase):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}