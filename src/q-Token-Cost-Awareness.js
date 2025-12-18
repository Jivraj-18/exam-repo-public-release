import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-token-extra";
  const title = "Token Accounting";

  const answer = "system and user roles";

  const question = html`
    <div class="mb-3">
      <p>
        Apart from the actual text content, what <strong>extra elements</strong>
        in a chat completion request also consume tokens?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
