import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-tabula";
  const title = "Extract Tables from PDF";

  const answer = "tabula.read_pdf";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python function from the <strong>tabula</strong> library
        is used to extract tables from PDF files?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
