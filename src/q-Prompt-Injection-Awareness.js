import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-prompt-injection";
  const title = "Prompt Injection Risk";

  const answer = "untrusted";

  const question = html`
    <div class="mb-3">
      <p>
        Documentation files like <code>README.md</code> from public repositories
        may contain hidden instructions that manipulate AI tools.
      </p>
      <p>
        Such content should always be treated as <strong>_____ input</strong>.
      </p>
      <label for="${id}" class="form-label">Fill in the blank:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
