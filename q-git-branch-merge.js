import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-merge";
  const title = "Git Merge Branch";

  const answer = "git merge feature-branch";

  const question = html`
    <div class="mb-3">
      <p>
        You are on the <code>main</code> branch. Which Git command 
        <strong>merges the changes from feature-branch into main</strong>?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
