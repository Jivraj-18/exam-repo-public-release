import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-extract";
  const title = "Extract Tables from PDF";

  const answer = "tabula.read_pdf('data.pdf', pages='all')";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python Tabula method is used to extract all tables from a PDF file 
        named <code>data.pdf</code>? Write the method call that returns all tables 
        from all pages.
      </p>
      <label for="${id}" class="form-label">Python code:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="tabula..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}