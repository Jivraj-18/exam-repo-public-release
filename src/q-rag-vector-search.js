import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rag-benefit";
  const title = "Key Benefit of RAG";

  const answer = "reduces hallucinations";

  const question = html`
    <div class="mb-3">
      <p>
        What is the <strong>primary advantage</strong> of using
        Retrieval Augmented Generation (RAG) instead of a plain LLM response?
      </p>
      <label for="${id}" class="form-label">Main benefit:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
