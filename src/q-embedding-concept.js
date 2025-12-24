import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-chat-model";
  const title = "LLM Chat Completion Model";

  const answer = "gpt-4o-mini";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is specifically designed to be a <strong>low-cost, fast option</strong>
        for chat completions while still supporting reasoning and multimodal inputs?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
