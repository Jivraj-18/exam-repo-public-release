import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gha-trigger";
  const title = "GitHub Actions Manual Trigger";

  const answer = "workflow_dispatch";

  const question = html`
    <div class="mb-3">
      <p>
        Which GitHub Actions trigger allows a workflow to be
        <strong>manually started</strong> from the GitHub UI?
      </p>
      <label for="${id}" class="form-label">Trigger name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
