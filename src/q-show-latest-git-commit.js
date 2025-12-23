import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-latest-commit";
  const title = "Show Latest Git Commit";

  const answer = "git log -1";

  const question = html`
    <div class="mb-3">
      <p>
        A developer has just pulled changes from a shared Git repository and
        wants to quickly inspect the <strong>most recent commit</strong>
        message and metadata on the current branch.
      </p>
      <p>
        Which <strong>Git command</strong> shows only the latest commit in a
        concise log view?
      </p>
      <label for="${id}" class="form-label">Git command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
