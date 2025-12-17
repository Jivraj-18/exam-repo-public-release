import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-actions-schedule";
  const title = "GitHub Actions Schedule";

  const answer = "0 2 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        What cron expression runs a GitHub Actions workflow every day at 2:00 AM UTC?
        (Use standard cron format with 5 fields)
      </p>
      <label for="${id}" class="form-label">Cron expression:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="* * * * *" />
    </div>
  `;

  return { id, title, weight, question, answer };
}