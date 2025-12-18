import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-markdown-tool";
  const title = "PDF to Markdown Tooling";

  const answer = "pymupdf4llm";

  const question = html`
    <div class="mb-3">
      <p>
        According to the provided tutorial, which specialized Python library/component is 
        specifically <strong>optimized for generating Markdown for Large Language Models</strong> 
        by removing irrelevant formatting while preserving semantic structure?
      </p>
      <label for="${id}" class="form-label">Library Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}