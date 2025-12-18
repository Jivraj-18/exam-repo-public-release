import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rag-definition";
  const title = "Retrieval Augmented Generation";

  const answer = "retrieval";

  const question = html`
    <div class="mb-3">
      <p>
        In Retrieval Augmented Generation (RAG), the step that fetches
        relevant documents before generation is called
        <strong>_____</strong>.
      </p>
      <label for="${id}" class="form-label">Term:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}