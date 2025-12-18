import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-rebase";
  const title = "Git Interactive Rebase";

  const answer = "git rebase -i HEAD~3";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command allows you to <strong>interactively rebase</strong> the last
        3 commits, enabling you to edit, squash, or reorder them?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
