
import { html } from "https://cdn.jsdelivr.net/npm/llit-html@3/lit-html.js";

export default async function ({ user, weight = 1.75 }) {
  const id = "q-git-undo-commit";
  const title = "Undoing a Local Git Commit";

  const answer = "git reset --soft HEAD~1";

  const question = html`
    <div class="mb-3">
      <p>
        You made a Git commit locally but have <strong>not pushed</strong> it yet.
        Write the Git command to undo the commit while keeping changes staged.
      </p>
      <label for="${id}" class="form-label">Git command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}