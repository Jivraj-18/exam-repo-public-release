// q-openai-toolchoice-required.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-toolchoice-required";
  const title = "OpenAI Function Calling: Force Tool Use";

  const answer = "required";

  const question = html`
    <div class="mb-3">
      <p>
        In OpenAI Chat Completions with tools enabled, you want to guarantee the model
        <strong>must</strong> call a tool (not respond normally).
      </p>
      <p>
        What value should <code>tool_choice</code> be set to?
      </p>
      <label for="${id}" class="form-label">tool_choice value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
