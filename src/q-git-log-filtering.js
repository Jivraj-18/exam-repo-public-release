import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-log";
  const title = "View Recent Git Commits";

  const answer = "git log --oneline";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>git command</strong> shows the commit history in a
        compact <strong>one-line format</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
