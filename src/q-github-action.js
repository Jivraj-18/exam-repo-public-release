import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-scheduled-workflow";
  const title = "Scheduled Workflows in GitHub Actions";

  const answer = "cron";

  const question = html`
    <div class="mb-3">
      <p>
        GitHub Actions allows workflows to run automatically at fixed time
        intervals. Which scheduling format is used to define these time-based
        triggers?
      </p>
      <label for="${id}" class="form-label">Scheduling Format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
