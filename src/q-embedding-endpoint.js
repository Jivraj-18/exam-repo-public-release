import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-embedding-endpoint";
  const title = "Embedding API Endpoint";

  const answer = "/v1/embeddings";

  const question = html`
    <div class="mb-3">
      <p>
        What is the OpenAI API endpoint path used
        to generate <strong>text embeddings</strong>?
      </p>
      <label for="${id}" class="form-label">Endpoint:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
