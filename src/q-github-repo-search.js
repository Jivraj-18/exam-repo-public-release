import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-repo-search";
  const title = "GitHub Repository Search";

  const answer = "awesome-ai";

  const question = html`
    <div class="mb-3">
      <p>
        Using the <strong>GitHub Search API</strong>, find the
        <strong>most starred public repository</strong>
        created after <strong>2023-01-01</strong> that contains the keyword
        <strong>“ai”</strong>.
      </p>
      <p>Return only the repository name.</p>
      <label for="${id}" class="form-label">Repository Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
