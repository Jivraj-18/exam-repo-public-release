import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-importhtml-syntax";
  const title = "Google Sheets IMPORTHTML Function";

  const answer = '=IMPORTHTML("https://example.com", "table", 1)';

  const question = html`
    <div class="mb-3">
      <p>
        In Google Sheets, what formula would you use to import the first table
        from the URL <code>https://example.com</code>?
      </p>
      <label for="${id}" class="form-label">Formula:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='=IMPORTHTML(...)' />
      <small class="form-text text-muted">
        Hint: Use IMPORTHTML function with URL, query type, and index
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}