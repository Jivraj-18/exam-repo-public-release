import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-headless";
  const title = "Playwright: Headless Browser Launch";

  const answer = "p.chromium.launch({ headless: true })";

  const question = html`
    <div class="mb-3">
      <p><strong>Question name:</strong> ${title}</p>
      <p>
        Using Playwright in Python, write the line of code that launches
        a <strong>headless Chromium browser</strong>.
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
