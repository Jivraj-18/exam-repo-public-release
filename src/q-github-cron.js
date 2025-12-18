import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-cron";
  const title = "GitHub Actions Schedule Syntax";

  const answer = "schedule";

  const question = html`
    <div class="mb-3">
      <p>
        In a GitHub Actions workflow YAML file, what keyword is used under
        <code>on:</code> to trigger a workflow at specific times using cron syntax?
      </p>
      <pre><code>on:
  ______:
    - cron: "0 0 * * *"</code></pre>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Hint: This allows workflows to run automatically at scheduled intervals
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}