// q-jina-embeddings-endpoint.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-jina-embeddings-endpoint";
  const title = "Jina AI: Unified Embeddings Endpoint";

  const answer = "https://api.jina.ai/v1/embeddings";

  const question = html`
    <div class="mb-3">
      <p>
        Your team wants one endpoint that can embed <strong>both text and base64 images</strong>
        using Jina’s CLIP model.
      </p>
      <p>
        Type the <strong>exact</strong> Jina API endpoint URL used for embeddings.
      </p>
      <label for="${id}" class="form-label">Endpoint:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
