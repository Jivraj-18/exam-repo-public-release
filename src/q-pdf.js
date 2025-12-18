import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tabula-pages";
  const title = "PDF Data Extraction";

  const answer = "all";

  const question = html`
    <div class="mb-3">
      <p>
        Using the <code>tabula-py</code> library to extract tables, what value should be 
        passed to the <code>pages</code> parameter to ensure the library scans 
        <strong>every page</strong> of the document for tables?
      </p>
      <label for="${id}" class="form-label">Parameter Value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}