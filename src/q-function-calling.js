import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ga4-tool-choice";
  const title = "Function Calling Enforcement";

  const answer = "required";

  const question = html`
    <div class="mb-3">
      <p>
        In GA4 Function Calling questions,
        which value of <code>tool_choice</code>
        ensures that the model <strong>must</strong>
        call one of the provided tools?
      </p>
      <label for="${id}" class="form-label">tool_choice value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
