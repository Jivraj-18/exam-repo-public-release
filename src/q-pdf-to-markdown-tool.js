import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-llm";
  const title = "PDF to Markdown for LLMs";

  const answer = "PyMuPDF4LLM";

  const question = html`
    <div class="mb-3">
      <p>
        Which specific Python library component mentioned in the reading material 
        is optimized for generating Markdown from PDFs specifically for 
        Large Language Models (LLMs)?
      </p>
      <label for="${id}" class="form-label">Library Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}