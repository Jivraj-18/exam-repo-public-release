import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gha-hash";
  const title = "GitHub Actions Cache Keys";

  const answer = "hashFiles";

  const question = html`
    <div class="mb-3">
      <p>
        In a GitHub Actions workflow using <code>actions/cache</code>, you often need to 
        generate a cache key that changes only when your dependencies change.
      </p>
      <p>
        Which GitHub Actions expression function should you use to generate a SHA-256 hash 
        of your <code>uv.lock</code> or <code>requirements.txt</code> file?
      </p>
      <p><em>(Provide just the function name, e.g., <code>contains</code>)</em></p>
      <label for="${id}" class="form-label">Function Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}