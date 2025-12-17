import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-token-billing";
  const title = "LLM Token Billing";

  const answer = "tokens";

  const question = html`
    <div class="mb-3">
      <p>
        OpenAI language models charge users primarily based on
        the number of <strong>_____</strong> processed in requests and responses.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
