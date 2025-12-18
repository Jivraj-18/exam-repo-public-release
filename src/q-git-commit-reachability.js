import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-git-commit-reachability";
  const title = "Git: Commit Reachability";

  const question = html`
    <div class="mb-3">
      <p>You are on the <code>main</code> branch and run the following Git commands in sequence:</p>
      <pre><code class="language-bash">git checkout main
git checkout HEAD~1
git commit --allow-empty -m "temp commit"
git checkout main</code></pre>
      
      <p>What happens to the commit created with the message "temp commit"?</p>
      
      <p>Select the correct option:</p>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-a" value="a" />
        <label class="form-check-label" for="${id}-a">
          The commit is added to the main branch
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-b" value="b" />
        <label class="form-check-label" for="${id}-b">
          The commit exists but is not reachable from any branch
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-c" value="c" />
        <label class="form-check-label" for="${id}-c">
          The commit is automatically deleted
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="${id}" id="${id}-d" value="d" />
        <label class="form-check-label" for="${id}-d">
          The commit is merged into main
        </label>
      </div>
    </div>
  `;

  const answer = "b";

  return { id, title, weight, question, answer };
}
