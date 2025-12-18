import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-clone";
  const title = "Clone a Git Repository";

  const answer = "git clone https://github.com/user/repo.git";

  const question = html`
    <div class="mb-3">
      <p>
        Write the Git command to clone a repository
        from <code>https://github.com/user/repo.git</code>.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
