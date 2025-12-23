import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-git-checkout";
    const title = "Git Checkout";

    const random = seedrandom(`${user.email}#${id}`);

    const branchName = "feature-" + Math.floor(random() * 1000);
    const answer = `git checkout -b ${branchName}`;

    const question = html`
    <div class="mb-3">
      <p>
        You want to create and switch to a new branch named <code>${branchName}</code>.
      </p>
      <p>
        Write the Git command to do this in one step.
      </p>
      
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" type="text" placeholder="git ..." />
    </div>
  `;

    return { id, title, weight, question, answer };
}
