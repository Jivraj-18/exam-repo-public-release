import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-search";
  const title = "GitHub User Search";

  const answer = "sort=joined&order=desc";

  const question = html`
    <div class="mb-3">
      <p>
        When searching GitHub users via the API, which query parameters
        ensure the <strong>newest accounts appear first</strong>?
      </p>
      <label for="${id}" class="form-label">Query parameters:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
