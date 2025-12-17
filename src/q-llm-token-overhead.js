import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-llm-token-overhead";
    const title = "LLM Token Cost – Hidden Tokens";

    const answer = "message metadata";

    const question = html`
    <div class="mb-3">
      <p>
        When calculating input token usage for a chat completion request,
        tokens are consumed not only by the text content but also by
        internal structures added by the API.
      </p>
      <p>
        What is the primary non-text contributor to token usage
        even when the user message is very short?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
