import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-gh-cron";
  const title = "GitHub Actions Cron Syntax";

  const answer = "0 0 * * *";

  const question = html`
    <div class="mb-3">
      <p>
        In a GitHub Actions workflow YAML file, what is the exact 
        <code>cron</code> syntax string to schedule a job to run 
        exactly at 00:00 UTC every day?
      </p>
      <label for="${id}" class="form-label">Cron string:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}