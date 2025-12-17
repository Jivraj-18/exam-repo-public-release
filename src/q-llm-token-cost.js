import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-token-cost";
  const title = "LLM Token Cost Command";

  const answer = "tiktoken.encoding_for_model";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python function from the <strong>tiktoken</strong> library is used to
        get the tokenizer for a specific OpenAI model?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
