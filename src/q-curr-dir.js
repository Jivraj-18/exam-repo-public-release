import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-pwd";
  const title = "Current Directory Command";

  const answer = "pwd";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command prints the <strong>absolute path</strong> of the
        <strong>current working directory</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
