import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gsheets-importhtml";
  const title = "Google Sheets Scraping";

  const answer = '=IMPORTHTML("https://example.com", "table", 1)';

  const question = html`
    <div class="mb-3">
      <p>
        What is the Google Sheets formula to import the <strong>first table</strong> 
        from the website <code>https://example.com</code>?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='=FUNCTION("URL", ...)' />
    </div>
  `;

  return { id, title, weight, question, answer };
}