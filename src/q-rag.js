import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rag-purpose";
  const title = "Purpose of RAG";

  const answer = "external knowledge";

  const question = html`
    <div class="mb-3">
      <p>
        Retrieval-Augmented Generation (RAG) improves LLM responses by
        injecting what into the prompt before generation?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
