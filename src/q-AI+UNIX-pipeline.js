import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-pipe";
  const title = "UNIX Pipe into LLM";

  const answer = "llm";

  const question = html`
    <div class="mb-3">
      <p>
        Which CLI tool is explicitly designed to accept
        <strong>stdin from UNIX pipes</strong> and process it using LLMs?
      </p>
      <label for="${id}" class="form-label">Tool name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
