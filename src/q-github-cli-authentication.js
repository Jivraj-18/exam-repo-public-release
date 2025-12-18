import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-auth";
  const title = "GitHub CLI Authentication";

  const answer = "gh auth login";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>GitHub CLI command</strong> is used to authenticate
        your GitHub account from the terminal?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
