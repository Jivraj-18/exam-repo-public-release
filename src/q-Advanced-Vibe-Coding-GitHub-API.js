import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vibe-github-api-advanced";
  const title = "Advanced Vibe Coding – GitHub API";

  const answer =
    "return fetch(`https://api.github.com/users/${user}/repos`).then(r => r.json()).then(repos => repos[0].created_at);";

  const question = html`
    <div class="mb-3">
      <p>
        You are vibe-coding a quick prototype using the <strong>GitHub REST API</strong>.
        The variable <code>user</code> already exists.
      </p>
      <p>
        Which JavaScript function body fetches the user's repositories from GitHub
        and returns the <strong>creation date of the first repository</strong>
        using the API response?
      </p>
      <p>
        The response must <strong>only contain executable JavaScript code</strong>
        and use <code>return</code>.
      </p>
      <label for="${id}" class="form-label">Function body:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
