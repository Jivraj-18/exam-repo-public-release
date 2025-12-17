import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-action";
  const title = "GitHub Actions Schedule";

  const answer = "cron";

  const question = html`
    <div class="mb-3">
      <p>
        Which keyword is used in a GitHub Actions workflow file to define a
        <strong>scheduled</strong> job?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
