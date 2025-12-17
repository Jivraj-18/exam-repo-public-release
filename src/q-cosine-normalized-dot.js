// q-cosine-normalized-dot.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cosine-normalized-dot";
  const title = "Normalized Embeddings Similarity";

  const answer = "dot product";

  const question = html`
    <div class="mb-3">
      <p>
        Two embedding vectors are already <strong>L2-normalized</strong> (each has magnitude 1).
        What single operation gives their <strong>cosine similarity</strong>?
      </p>
      <p class="mb-0"><em>Answer in two words.</em></p>
      <label for="${id}" class="form-label">Operation:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
