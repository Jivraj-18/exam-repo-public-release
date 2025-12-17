import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-git-operations";
  const title = "Advanced Git Operations";

  const question = html`
    <div class="mb-3">
      <p>
        You accidentally committed a file named <code>secret_key.txt</code> to your repository.
        You want to remove it from the entire history, not just the latest commit.
      </p>
      <p>
        Which specific Git command (using filter-branch) performs this action?
      </p>
      <label for="${id}" class="form-label">Complete the command: <code>git filter-branch --force --index-filter ...</code></label>
      <input class="form-control" id="${id}" name="${id}" placeholder="'git rm --cached --ignore-unmatch secret_key.txt' ..." />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (val) => val.includes("git rm") && val.includes("secret_key.txt")
  };
}
