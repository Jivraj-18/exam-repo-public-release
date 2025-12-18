import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling";
  const title = "LLM Function Calling";

  const answer = "json";

  const question = html`
    <div class="mb-3">
      <p>
        When an LLM decides to invoke a tool or function,
        it returns the function name and arguments in
        <strong>_____</strong> format.
      </p>
      <label for="${id}" class="form-label">Format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}