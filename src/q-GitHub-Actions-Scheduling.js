import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-cron";
  const title = "GitHub Actions Cron Schedule";

  const answer = "0 3 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        What <strong>cron expression</strong> runs a
        GitHub Action <strong>daily at 03:00 UTC</strong>?
      </p>
      <label for="${id}" class="form-label">Cron Expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
