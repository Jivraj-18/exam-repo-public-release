import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sheets-xml";
  const title = "Google Sheets IMPORTXML";

  const answer = '=IMPORTXML("https://example.com", "//title")';

  const question = html`
    <div class="mb-3">
      <p>
        In Google Sheets, which formula would you use to scrape the <strong>text content of the &lt;title&gt; tag</strong> 
        from the website <code>https://example.com</code> using the <code>IMPORTXML</code> function?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='=IMPORTXML(...)' />
    </div>
  `;

  return { id, title, weight, question, answer };
}