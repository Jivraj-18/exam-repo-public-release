import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-chat-endpoint";
  const title = "OpenAI Chat API Endpoint";

  const answer = "https://api.openai.com/v1/chat/completions";

  const question = html`
    <div class="mb-3">
      <p>
        What is the <strong>OpenAI API endpoint</strong> used to generate responses
        from chat-based language models?
      </p>
      <label for="${id}" class="form-label">API Endpoint:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
