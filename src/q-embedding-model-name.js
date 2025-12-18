import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-model";
  const title = "OpenAI Embedding Model";

  const answer = "text-embedding-3-small";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is recommended in this course for generating
        <strong>text embeddings</strong> efficiently at low cost?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
