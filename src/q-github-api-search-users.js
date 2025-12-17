import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-user-search";
  const title = "GitHub User Search API";

  const answer =
    "https://api.github.com/search/users?q=location:Berlin+followers:>100&sort=joined&order=desc";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>GitHub API URL</strong> searches for users located in
        <strong>Berlin</strong> with more than <strong>100 followers</strong>,
        sorted by newest joined?
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
