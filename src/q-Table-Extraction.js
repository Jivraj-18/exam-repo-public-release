import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-table-tool";
  const title = "Extract Tables from PDF";

  const answer = "tabula";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Python library</strong> is most commonly used to
        extract <strong>tabular data</strong> from PDF files using Java?
      </p>
      <label for="${id}" class="form-label">Library name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
