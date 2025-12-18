import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-endpoint";
  const title = "OpenAI Chat Completion Endpoint";

  const answer = "https://api.openai.com/v1/chat/completions";

  const question = html`
    <div class="mb-3">
      <p>
        What is the correct OpenAI API endpoint URL used to generate
        <strong>chat completions</strong> using models like
        <code>gpt-4o-mini</code>?
      </p>
      <label for="${id}" class="form-label">API Endpoint URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
