import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling-format";
  const title = "Function Calling Output";

  const answer = "JSON";

  const question = html`
    <div class="mb-3">
      <p>
        In OpenAI Function Calling, the model returns the selected function
        name and arguments in <strong>_____</strong> format.
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
