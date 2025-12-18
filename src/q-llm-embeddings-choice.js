import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-embeddings-choice";
  const title = "Embedding Granularity Decision";

  const answer = "paragraph";

  const question = html`
    <div class="mb-3">
      <p>
        You are building a RAG system over long technical documents.
        Embeddings can be generated at the document, paragraph, or sentence level.
      </p>
      <p>
        To balance retrieval precision and context completeness, which
        <strong>granularity</strong> is generally the best default choice?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
