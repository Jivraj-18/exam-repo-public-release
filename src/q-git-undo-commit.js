import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-undo-commit";
  const title = "Git: Undo Last Commit";

  const answer = "git reset --soft HEAD~1";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command removes the <strong>most recent commit</strong>
        but keeps all changes <strong>staged</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
