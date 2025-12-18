import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-max-tokens";
  const title = "Maximum Tokens in LLM Response";

  const answer = "max_tokens";

  const question = html`
    <div class="mb-3">
      <p>
        When calling an LLM API, which parameter is used to specify
        the <strong>maximum number of tokens</strong> that the model
        is allowed to generate in its response?
      </p>
      <label for="${id}" class="form-label">Parameter name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
