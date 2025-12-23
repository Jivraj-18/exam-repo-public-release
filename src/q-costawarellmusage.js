import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-aipipe-base-url";
  const title = "AI Pipe Base URL Configuration";

  const answer = "https://aipipe.org/openrouter/v1";

  const question = html`
    <div class="mb-3">
      <p>
        To route OpenAI-compatible chat completion requests through <strong>AI Pipe</strong>
        using <strong>OpenRouter models</strong>, what should <code>OPENAI_BASE_URL</code>
        be set to?
      </p>
      <label for="${id}" class="form-label">Base URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
