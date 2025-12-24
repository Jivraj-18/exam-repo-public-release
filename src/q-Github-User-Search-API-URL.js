import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-api-url";
  const title = "GitHub User Search API";

  const answer = "https://api.github.com/search/users?q=location:Berlin+followers:>100";

  const question = html`
    <div class="mb-3">
      <p>
        What is the exact GitHub API URL to search for users located in
        <strong>Berlin</strong> with more than <strong>100 followers</strong>?
      </p>
      <label for="${id}" class="form-label">URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
