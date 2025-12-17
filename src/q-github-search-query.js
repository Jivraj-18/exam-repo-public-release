import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search-followers";
  const title = "GitHub User Search";

  const answer = "followers:>100 language:java";

  const question = html`
    <div class="mb-3">
      <p>
        What GitHub search query finds users who code in
        <strong>Java</strong> and have <strong>more than 100 followers</strong>?
      </p>
      <label for=${id} class="form-label">Search Query:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
