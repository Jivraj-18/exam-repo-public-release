import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-embedding-cosine";
    const title = "Embeddings – Similarity Measure";

    const answer = "cosine similarity";

    const question = html`
    <div class="mb-3">
      <p>
        Two embedding vectors are L2-normalized (their magnitudes are 1).
        The similarity score is computed using their dot product.
      </p>
      <p>
        What is the standard name of this similarity metric?
      </p>
      <label for="${id}" class="form-label">Metric name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
