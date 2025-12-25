import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-save";
  const title = "LLM CLI Template Save";

  const answer = "--save";

  const question = html`
    <div class="mb-3">
      <p>
        When using Simon Willison's <code>llm</code> tool, which flag is used to 
        store a system prompt and defaults as a reusable template?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="--..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}