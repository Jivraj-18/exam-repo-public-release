import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-actions-debug";
  const title = "Fix GitHub Actions Trigger";

  const answer = "pull_request";

  const question = html`
    <div class="mb-3">
      <p>
        A GitHub Actions workflow is intended to run whenever a pull request is
        opened or updated, but it currently only runs on direct pushes.
      </p>
      <p>
        Which <strong>single event key</strong> must be added under the
        <code>on:</code> section of the workflow YAML to ensure it runs for pull
        requests?
      </p>
      <label for="${id}" class="form-label">Event name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}