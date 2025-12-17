import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search-api";
  const title = "GitHub User Search API";

  const answer = "https://api.github.com/search/users";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>GitHub REST API endpoint</strong> is used to
        <strong>search users</strong> by filters such as location and follower count?
      </p>
      <label for="${id}" class="form-label">API Endpoint:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
