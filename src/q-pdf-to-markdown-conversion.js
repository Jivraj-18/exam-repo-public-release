import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-markdown";
  const title = "Convert PDF to Markdown";

  const answer = "PYTHONUTF8=1 uvx markitdown report.pdf > report.md";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>command-line command</strong> converts
        <code>report.pdf</code> to Markdown using
        <strong>MarkItDown</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
