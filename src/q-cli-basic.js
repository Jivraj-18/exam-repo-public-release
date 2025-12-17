import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-basic";
  const title = "Basic CLI Command";

  const answer = "pwd";

  const question = html`
    <div class="mb-3">
      <p>
        Which Linux command prints the <strong>current working directory</strong>
        to the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
