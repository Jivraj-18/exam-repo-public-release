import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
//question 5
export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling";
  const title = "Function Calling Validation";

  const answer = "strict";

  const question = html`
    <div class="mb-3">
      <p>
        In OpenAI function calling schemas, which property ensures the model
        <strong>must follow the JSON schema exactly</strong>?
      </p>
      <label for="${id}" class="form-label">Property name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
