import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gha-cron-advanced";
  const title = "Advanced GitHub Actions Scheduling";

  const answer = "0 12 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        You are configuring a <strong>scheduled GitHub Actions workflow</strong>
        that must run <strong>once every day at 12:00 UTC</strong>.
      </p>
      <p>
        Which <strong>cron expression</strong> should be used in the
        <code>on.schedule</code> section of the workflow YAML to achieve this?
      </p>
      <label for="${id}" class="form-label">Cron expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
