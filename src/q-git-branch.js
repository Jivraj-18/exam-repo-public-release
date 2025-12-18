import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-git-branch";
  const title = "Git: Branch Counting";

  const random = seedrandom(`${user.email}#${id}`);
  const branches = Math.floor(random() * 5) + 2;

  const answer = (value) => {
    if (Number(value) !== branches) throw new Error("Incorrect branch count");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>You run:</p>
      <pre><code>git branch</code></pre>
      <p>The output shows <strong>${branches}</strong> branch names.</p>
      <label class="form-label">How many branches exist in the repository?</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
