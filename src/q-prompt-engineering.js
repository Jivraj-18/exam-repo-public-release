import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-temperature";
  const title = "LLM Temperature Parameter";

  const answer = "temperature";

  const question = html`
    <div class="mb-3">
      <p>
        In Large Language Model APIs (such as OpenAI or Anthropic),
        which parameter controls the <strong>randomness vs determinism</strong>
        of the model's output?
      </p>
      <label for="${id}" class="form-label">Parameter name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
