import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-cron";
  const title = "GitHub Actions Scheduling";

  const answer = "cron";

  const question = html`
    <div class="mb-3">
      <p>
        In GitHub Actions, which keyword is used inside
        the <code>schedule</code> trigger to define
        when a workflow should run?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
