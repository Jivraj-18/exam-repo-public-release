import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-log";
  const title = "View Commit History";

  const answer = "git log --oneline";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the commit history in a
        <strong>compact single-line format</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
