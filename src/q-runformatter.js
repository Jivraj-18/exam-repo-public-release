import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-npx-prettier";
  const title = "npx: Code Formatter";

  const answer = "npx prettier --write .";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>npx</strong> command formats all files in the current
        folder using <strong>Prettier</strong> without installing it globally?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
