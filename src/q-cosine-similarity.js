import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cosine-similarity";
  const title = "Cosine Similarity Usage";

  const answer = "text similarity";

  const question = html`
    <div class="mb-3">
      <p>
        Cosine similarity is most commonly used
        to measure what between two embeddings?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
