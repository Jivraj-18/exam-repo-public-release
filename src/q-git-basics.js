import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-current-branch";
  const title = "Check Current Git Branch";

  const answer = "git branch --show-current";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command shows the <strong>name of the currently checked-out branch</strong>
        without listing all branches?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
