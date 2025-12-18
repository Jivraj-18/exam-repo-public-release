import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-similarity";
  const title = "Embedding Similarity";

  const answer = "cosine similarity";

  const question = html`
    <div class="mb-3">
      <p>
        What similarity metric is most commonly used to compare
        <strong>text embeddings</strong> produced by LLMs?
      </p>
      <label for="${id}" class="form-label">Metric name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
