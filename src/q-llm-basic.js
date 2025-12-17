import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-basic";
  const title = "Using llm CLI Tool";

  const answer = "llm";

  const question = html`
    <div class="mb-3">
      <p>
        Which command-line tool by Simon Willison allows you to pipe shell output
        directly into a large language model for analysis?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
