import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-sentiment";
  const title = "LLM Sentiment Classification";

  const answer = "system";

  const question = html`
    <div class="mb-3">
      <p>
        In an OpenAI Chat Completion request, which message role should be used
        to give the model instructions such as:
        <em>"Classify the text as GOOD, BAD, or NEUTRAL"</em>?
      </p>
      <label for="${id}" class="form-label">Role:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
