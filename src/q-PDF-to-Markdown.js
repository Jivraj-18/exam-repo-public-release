import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-markdown";
  const title = "Convert PDF to Markdown";

  const answer =
    "pymupdf4llm.to_markdown('document.pdf')";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python function converts a PDF file into Markdown using
        <strong>PyMuPDF4LLM</strong>?
      </p>
      <label for="${id}" class="form-label">Function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
