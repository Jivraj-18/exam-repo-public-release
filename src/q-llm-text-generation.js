import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-text-generation";
  const title = "LLM API Text Generation";

  const answer = "gpt-4o-mini";

  const question = html`
    <div class="mb-3">
      <p>
        You need to send a text generation request to OpenAI's API endpoint
        <code>https://api.openai.com/v1/chat/completions</code> with a user message
        asking "What is the capital of France?".
      </p>
      <p>
        Which is the <strong>most cost-effective</strong> model from the following
        options that can handle this simple query?
      </p>
      <label for="${id}" class="form-label">Model name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., gpt-4o-mini" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
