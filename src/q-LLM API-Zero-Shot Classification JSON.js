import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-json-classification";
  const title = "LLM: JSON Sentiment Classification";

  const answer = `"model":"gpt-4o-mini"`;

  const question = html`
    <div class="mb-3">
      <p>
        You are writing a JSON request body for an OpenAI chat completion
        that classifies sentiment into <strong>POSITIVE, NEGATIVE, NEUTRAL</strong>.
      </p>
      <p>
        The model must be <strong>gpt-4o-mini</strong>, and the system message
        must instruct the model to respond with only one of these labels.
      </p>
      <p>
        Which exact JSON field ensures the correct model is used?
      </p>
      <label for="${id}" class="form-label">Exact JSON snippet:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
