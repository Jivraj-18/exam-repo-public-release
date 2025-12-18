import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling";
  const title = "LLM Function Calling";

  const answer = "structured output";

  const question = html`
    <div class="mb-3">
      <p>
        In modern LLM systems, function calling is mainly used to ensure
        that the model produces what kind of output?
      </p>
      <label for="${id}" class="form-label">Output type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
