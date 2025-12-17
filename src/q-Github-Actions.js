import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cron-daily";
  const title = "Cron Scheduling";

  const answer = "0 0 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        What cron expression runs a GitHub Action
        <strong>once every day at midnight (UTC)</strong>?
      </p>
      <label for="${id}" class="form-label">Cron Expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
