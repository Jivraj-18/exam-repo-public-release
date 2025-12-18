import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-log-oneline";
  const title = "Git Commit History (Compact View)";

  const answer = "git log --oneline";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the commit history in a <strong>compact,
        single-line-per-commit</strong> format?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
