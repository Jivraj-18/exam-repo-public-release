import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-clone";
  const title = "Clone Repository";

  const answer = "git clone";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command is used to
        <strong>download a remote repository to your local machine</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
