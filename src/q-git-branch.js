import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-new-branch";
  const title = "Git Branch Creation";

  const answer = "git switch -c develop";

  const question = html`
    <div class="mb-3">
      <p>
        Which Git command creates a new branch called
        <code>develop</code> and immediately switches to it
        using the modern Git syntax?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
