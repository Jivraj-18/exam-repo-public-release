import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-api";
  const title = "GitHub User Search API";

  const answer = "https://api.github.com/search/users?q=location:Delhi+followers:>100";

  const question = html`
    <div class="mb-3">
      <p>
        Which GitHub API URL searches for users located in
        <strong>Delhi</strong> with more than <strong>100 followers</strong>?
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
