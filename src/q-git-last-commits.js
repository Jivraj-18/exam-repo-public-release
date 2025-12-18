import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-last-commits";
  const title = "Git: Show Recent Commits";

  const answer = "git log -5";

  const question = html`
    <div class="mb-3">
      <p>
        In a Git repository, which single command shows the
        <strong>last 5 commits</strong> in reverse chronological order,
        including commit hashes and messages?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
