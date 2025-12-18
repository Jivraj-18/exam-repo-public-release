import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-latest-commit";
    const title = "Git Latest Commit";

    const answer = "git log -1";

    const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the <strong>most recent commit</strong> along with
        its message and metadata?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
