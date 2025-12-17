import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-actions-cron";
  const title = "GitHub Actions Cron Schedule";

  const answer = "0 2 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        You want a GitHub Actions workflow to run
        <strong>once daily at 02:00 UTC</strong>.
      </p>
      <p>
        What cron expression should you use in the <code>schedule</code> trigger?
      </p>
      <label for="${id}" class="form-label">Cron expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
