import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-tokens";
  const title = "LLM Token Awareness";

  const answer = "text-embedding-3-small";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI embedding model is recommended for
        <strong>low-cost, short text embeddings</strong>
        in most production use cases?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
