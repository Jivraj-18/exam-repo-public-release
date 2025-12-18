import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-cron";
  const title = "GitHub Actions Scheduling";

  const answer = "0 0 * * 0";

  const question = html`
    <div class="mb-3">
      <p>
        In a GitHub Actions workflow file, what is the <strong>POSIX cron expression</strong> 
        required to schedule a scraper to run <strong>every Sunday at midnight (00:00)</strong>?
      </p>
      <label for="${id}" class="form-label">Cron Expression:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. * * * * *" />
    </div>
  `;

  return { id, title, weight, question, answer };
}