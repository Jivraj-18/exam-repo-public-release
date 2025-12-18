import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-actions-cache-pip";
    const title = "GitHub Actions Dependency Cache";

    const answer = "~/.cache/pip";

    const question = html`
    <div class="mb-3">
      <p>
        When caching Python dependencies in GitHub Actions using
        <strong>actions/cache</strong>, which directory is commonly cached
        to speed up <code>pip install</code>?
      </p>
      <label for="${id}" class="form-label">Cache path:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}