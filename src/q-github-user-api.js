import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-user-search";
  const title = "GitHub API: User Search Query";

  const answer = "location:Dublin followers:>80";

  const question = html`
    <div class="mb-3">
      <p><strong>Question name:</strong> ${title}</p>
      <p>
        Write a GitHub Search API query that finds users located in
        <strong>Dublin</strong> with <strong>more than 80 followers</strong>.
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
