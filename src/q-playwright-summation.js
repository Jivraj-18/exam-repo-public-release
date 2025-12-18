import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-wait";
  const title = "Playwright Auto Waiting";

  const answer = "page.waitForSelector";

  const question = html`
    <div class="mb-3">
      <p>
        Which Playwright method ensures that a dynamically loaded
        table is present before extracting and summing its values?
      </p>
      <label for="${id}" class="form-label">Method name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
