import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-status";
  const title = "Git Commands: Staging";

  const answer = (input) => {
    // Accept "git add ." or "git add -A" or "git add *"
    const norm = input.trim().toLowerCase();
    return norm === "git add ." || norm === "git add -a" || norm === "git add *";
  };

  const question = html`
    <div class="mb-3">
      <p>You have modified 3 files in your working directory. You want to stage <strong>all</strong> of them for the next commit.</p>
      <p>Which single command achieves this from the current directory?</p>
      
      <label for="${id}" class="form-label">Git Command:</label>
      <input class="form-control" id="${id}" name="${id}" type="text" placeholder="git ..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}