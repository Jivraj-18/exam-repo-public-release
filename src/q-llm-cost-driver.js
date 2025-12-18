import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-cost-driver";
  const title = "LLM Cost Driver";

  const answer = "tokens";

  const question = html`
    <div class="mb-3">
      <p>
        In most commercial LLM APIs, usage cost is primarily calculated
        based on the number of <strong>_____</strong> processed.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
