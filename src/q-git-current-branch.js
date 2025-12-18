import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-current-branch";
  const title = "Git Current Branch";
  const answer = "git branch";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the <strong>current branch</strong>
        in a repository?
      </p>
      <p class="text-muted">
        Enter the exact command.
      </p>
    </div>
  `;

  return { id, title, question, answer, weight };
}
