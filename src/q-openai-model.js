import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-model";
  const title = "OpenAI Chat Completion Model";

  const answer = "gpt-4o-mini";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI model is commonly used for
        <strong>low-cost chat completions</strong>?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
