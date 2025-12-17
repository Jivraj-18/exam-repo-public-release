import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-token-tool";
  const title = "LLM Token Counting Tool";

  const answer = "openai tokenizer";

  const question = html`
    <div class="mb-3">
      <p>
        When estimating the number of tokens used by a prompt before
        sending it to an OpenAI-compatible LLM, which official tool is
        commonly used to analyze tokenization?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
