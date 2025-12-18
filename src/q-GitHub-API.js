import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search";
  const title = "Search GitHub Users by Location";

  const answer =
    "https://api.github.com/search/users?q=location:Dublin+followers:>60&sort=joined&order=desc";

  const question = html`
    <div class="mb-3">
      <p>
        What GitHub API URL searches for users located in <strong>Dublin</strong>
        with more than <strong>60 followers</strong>, sorted by newest?
      </p>
      <label for="${id}" class="form-label">API URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
