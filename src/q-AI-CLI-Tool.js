import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-cli";
  const title = "LLM CLI Tool";

  const answer = "llm";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool by Simon Willison is used to run LLM prompts directly from the terminal?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
