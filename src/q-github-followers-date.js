import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-followers-date";
  const title = "Fetch GitHub User Followers Count";
  const answer = "JavaScript function that returns the number of followers";
  const question = html`
    <div class="mb-3">
      <p>
        Write a prompt that uses the <strong>GitHub API</strong> to fetch how many
        followers a GitHub user has.
      </p>
      <p>
        The response should contain <strong>only the body of a JavaScript function</strong>.
        Assume the variable <code>user</code> already exists and return the followers count.
      </p>
      <label for="${id}" class="form-label">JavaScript function body:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;
  return { id, title, weight, question, answer };
}
