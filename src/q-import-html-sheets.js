import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-import-html-sheets";
  const title = "Import HTML to Google Sheets";

  const answer = "=IMPORTHTML(\"https://example.com/data\", \"table\", 1)";

  const question = html`
    <div class="mb-3">
      <p>
        Which Google Sheets function is used to import tables from a webpage? 
        Use the function with parameters to import the first table from 
        <code>https://example.com/data</code>.
      </p>
      <label for="${id}" class="form-label">Complete function call:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="=..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}