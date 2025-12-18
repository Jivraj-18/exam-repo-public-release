import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-status";
  const title = "Basic Git Command";

  const answer = "git status";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the <strong>current state of the working directory</strong>
        and indicates which files are <strong>modified, staged, or untracked</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
