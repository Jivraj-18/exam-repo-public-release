import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gitHub-actions-dependency-caching";
  const title = "GitHub Actions Dependency Caching";

  const answer = "actions/cache@v4";

  const question = html`
    <div class="mb-3">
      <p>
        In GitHub Actions workflows, which official action is used to
        <strong>cache dependencies</strong> (such as Python packages)
        to speed up repeated CI runs?
      </p>
      <p class="text-muted">
        Write the action name exactly as it appears in a workflow file.
      </p>
      <label for="${id}" class="form-label">Action name:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. owner/action@version"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
