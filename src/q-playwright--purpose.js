import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-js";
  const title = "Why Use Playwright?";

  const answer = "JavaScript-rendered content";

  const question = html`
    <div class="mb-3">
      <p>
        Playwright is preferred over <code>requests</code> when scraping websites
        that load data dynamically.
        <br />
        What type of content does Playwright handle effectively?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
