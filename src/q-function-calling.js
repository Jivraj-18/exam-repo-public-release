import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-function-calling";
  const title = "Function Calling Output";

  const answer = "tool_calls";

  const question = html`
    <div class="mb-3">
      <p>
        When an LLM decides to invoke a function using OpenAI
        Function Calling, which response field contains
        the <strong>function name and arguments</strong>?
      </p>
      <label for="${id}" class="form-label">Response field:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
