import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling-flag";
  const title = "Function Calling Strict Mode";

  const answer = "strict";

  const question = html`
    <div class="mb-3">
      <p>
        In OpenAI Function Calling, which configuration flag ensures that the
        model <strong>always follows the JSON schema exactly</strong>
        and does not hallucinate extra fields?
      </p>
      <label for="${id}" class="form-label">Flag name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
