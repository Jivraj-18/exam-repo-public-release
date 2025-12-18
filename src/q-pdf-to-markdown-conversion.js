import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-markdown";
  const title = "PDF Tooling";

  const answer = "markitdown";

  const question = html`
    <div class="mb-3">
      <p>
        Which Microsoft-developed tool, often run via <code>uvx</code>, is designed 
        to convert various document formats (including PDF and XLSX) into 
        <strong>Markdown</strong> for use with LLMs?
      </p>
      <label for="${id}" class="form-label">Tool Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}