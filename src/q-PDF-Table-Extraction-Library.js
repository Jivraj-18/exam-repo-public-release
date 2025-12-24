import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-tabula";
  const title = "PDF Table Extraction Library";

  const answer = "tabula-py";

  const question = html`
    <div class="mb-3">
      <p>
        What Python library is commonly used to extract tables from PDFs
        using Java-based Tabula?
      </p>
      <label for="${id}" class="form-label">Library:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
