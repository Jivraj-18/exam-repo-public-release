import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-actions";
  const title = "GitHub Actions Trigger";

  const answer = "pull_request";

  const question = html`
    <div class="mb-3">
      <p>
        Which GitHub Actions event is commonly used to automatically run tests
        when a pull request is opened or updated?
      </p>
      <label for="${id}" class="form-label">Event name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

