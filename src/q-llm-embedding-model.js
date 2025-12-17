import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-embedding-model";
  const title = "LLM Embedding Model";

  const answer = "text-embedding-3-small";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI embedding model is recommended in GA4 for generating
        cost-efficient text embeddings using the OpenAI API?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
