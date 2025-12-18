import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gha-trigger";
  const title = "GitHub Actions Manual Trigger";

  const answer = "workflow_dispatch";

  const question = html`
    <div class="mb-3">
      <p>
        Which GitHub Actions event allows a workflow to be
        <strong>triggered manually</strong> from the GitHub UI?
      </p>
      <label for="${id}" class="form-label">Event name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
