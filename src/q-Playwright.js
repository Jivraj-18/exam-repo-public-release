import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-install";
  const title = "Install Playwright Browsers";

  const answer = "python -m playwright install";

  const question = html`
    <div class="mb-3">
      <p>
        After installing Playwright, which command installs all required
        browser binaries?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
