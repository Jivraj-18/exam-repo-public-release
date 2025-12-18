import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
//question 3
export default async function ({ user, weight = 1 }) {
  const id = "q-embeddings-model";
  const title = "Text Embeddings Model";

  const answer = "text-embedding-3-small";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is used in the course for generating
        <strong>text embeddings</strong> via the embeddings API?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
