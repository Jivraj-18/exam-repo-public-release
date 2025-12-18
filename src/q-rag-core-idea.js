import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rag-definition";
  const title = "RAG Core Concept";

  const answer = "retrieval augmented generation";

  const question = html`
    <div class="mb-3">
      <p>
        What does the acronym <strong>RAG</strong> stand for in modern
        LLM-based question answering systems?
      </p>
      <label for="${id}" class="form-label">Full form:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
