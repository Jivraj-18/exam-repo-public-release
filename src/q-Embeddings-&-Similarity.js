import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-metric";
  const title = "Embedding Similarity Metric";

  const answer = "cosine similarity";

  const question = html`
    <div class="mb-3">
      <p>
        Which mathematical measure is most commonly used to compare
        <strong>text embedding vectors</strong> for semantic similarity?
      </p>
      <label for="${id}" class="form-label">Metric name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
