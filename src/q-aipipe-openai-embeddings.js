// q-aipipe-openai-embeddings.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-aipipe-openai-embeddings";
  const title = "AI Pipe: OpenAI Embeddings Endpoint";

  const answer = "https://aipipe.org/openai/v1/embeddings";

  const question = html`
    <div class="mb-3">
      <p>
        You’re using <strong>AI Pipe</strong> as a proxy for OpenAI. You want to call the
        <strong>embeddings</strong> endpoint (OpenAI-compatible) through AI Pipe.
      </p>
      <p>
        Type the <strong>full URL</strong> you should POST to (no headers needed).
      </p>
      <label for="${id}" class="form-label">URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <div class="form-text">Answer must match exactly (including https).</div>
    </div>
  `;

  return { id, title, weight, question, answer };
}
