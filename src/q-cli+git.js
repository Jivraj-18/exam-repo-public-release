import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-diff";
  const title = "Git Diff Basics";

  const answer = "git diff";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the <strong>unstaged changes</strong>
        between your working directory and the last commit?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
