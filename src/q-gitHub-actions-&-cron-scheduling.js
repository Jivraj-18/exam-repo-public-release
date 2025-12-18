import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gha-cron";
  const title = "GitHub Actions Scheduling";

  const answer = "0 12 * * 1";

  const question = html`
    <div class="mb-3">
      <p>
        In a GitHub Actions workflow file, you need to schedule a scraper to run 
        <strong>every Monday at exactly 12:00 PM UTC</strong>. What is the correct 
        <code>cron</code> expression for this schedule?
      </p>
      <label for="${id}" class="form-label">Cron Expression:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="* * * * *" />
    </div>
  `;

  return { id, title, weight, question, answer };
}