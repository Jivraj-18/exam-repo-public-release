import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-token-overhead";
  const title = "Token Accounting Insight";

  const answer = "message role metadata";

  const question = html`
    <div class="mb-3">
      <p>
        When calculating total input tokens for an OpenAI chat request,
        which hidden factor adds extra tokens beyond the visible user text?
      </p>
      <label for="${id}" class="form-label">Factor:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
