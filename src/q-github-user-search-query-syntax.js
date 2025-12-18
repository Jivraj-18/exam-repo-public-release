import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search";
  const title = "GitHub User Search Filter";

  const answer = "location:Shanghai followers:>150";

  const question = html`
    <div class="mb-3">
      <p>
        Write the <strong>GitHub Search API query string</strong> used to find
        users located in Shanghai with more than 150 followers.
      </p>
      <label for="${id}" class="form-label">Query string:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
