import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-branch";
  const title = "Create a Git Branch";

  const answer = "git checkout -b feature-x";

  const question = html`
    <div class="mb-3">
      <p>
        What Git command creates a new branch named <code>feature-x</code>
        and switches to it in one step?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}