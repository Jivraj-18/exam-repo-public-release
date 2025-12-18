import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sheets-importhtml";
  const title = "Google Sheets Scraping";

  const answer = "list";

  const question = html`
    <div class="mb-3">
      <p>
        When using the <code>=IMPORTHTML(url, query, index)</code> function in Google Sheets 
        to scrape an <strong>ordered or unordered list</strong> (like &lt;ol&gt; or &lt;ul&gt;), 
        what string value must be passed as the <strong>query</strong> parameter?
      </p>
      <label for="${id}" class="form-label">Query Parameter:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}