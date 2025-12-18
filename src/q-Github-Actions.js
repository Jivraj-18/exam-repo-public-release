import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-actions-trigger";
  const title = "GitHub Actions Trigger";

  const answer = "push";

  const question = html`
    <div class="mb-3">
      <p>
        Which GitHub Actions event automatically runs a workflow whenever
        new commits are pushed to a repository?
      </p>
      <label for="${id}" class="form-label">Event name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
