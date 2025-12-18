import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-token-overhead";
  const title = "LLM: Token Accounting Insight";

  const answer = "system";

  const question = html`
    <div class="mb-3">
      <p>
        When sending a chat completion request, some tokens are consumed
        even before the user text is processed.
      </p>
      <p>
        Which message role contributes to <strong>instructional overhead</strong>
        and increases token usage even if it is short?
      </p>
      <label for="${id}" class="form-label">Message role:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
