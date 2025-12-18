import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-text";
  const title = "Extract Text from PDF";

  const answer = "pdftotext report.pdf";

  const question = html`
    <div class="mb-3">
      <p>
        Which command extracts text from a PDF file named
        <strong>report.pdf</strong> into a text file using
        <code>pdftotext</code>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
