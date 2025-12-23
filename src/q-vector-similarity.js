import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vector-similarity";
  const title = "Vector Similarity Metric";

  const answer = "cosine similarity";

  const question = html`
    <div class="mb-3">
      <p>
        Which similarity metric is most commonly used
        to compare two <strong>normalized embedding vectors</strong>
        in semantic search systems?
      </p>
      <label for="${id}" class="form-label">Metric name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
