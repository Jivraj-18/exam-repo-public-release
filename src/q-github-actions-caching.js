import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-cache";
  const title = "GitHub Actions Cache";

  const answer = "actions/cache@v4";

  const question = html`
    <div class="mb-3">
      <p>
        Which official GitHub Action is used to
        <strong>cache dependencies</strong> between workflow runs?
      </p>
      <label for="${id}" class="form-label">Action name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
