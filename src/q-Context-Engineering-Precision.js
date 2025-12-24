import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-context-engineering";
  const title = "Context Engineering";

  const answer = "relevant";

  const question = html`
    <div class="mb-3">
      <p>
        Effective context engineering avoids dumping entire repositories
        into prompts.
      </p>
      <p>
        Instead, it focuses on providing the most <strong>_____ context</strong>
        needed for the task.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
