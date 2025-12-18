import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-install";
  const title = "Playwright Browser Install";

  const answer = "python -m playwright install";

  const question = html`
    <div class="mb-3">
      <p>
        What is the exact command used to install Playwright browsers
        after installing the Playwright Python package?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
