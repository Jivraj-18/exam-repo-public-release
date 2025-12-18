import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-cron";
  const title = "GitHub Actions Cron";

  const answer = "30 18 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        What <strong>cron expression</strong> runs a GitHub Action
        <strong>every day at 18:30 UTC</strong>?
      </p>
      <label for="${id}" class="form-label">Cron:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
