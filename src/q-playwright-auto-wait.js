import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-wait";
  const title = "Playwright Auto-Waiting";

  const answer = "page.query_selector_all";

  const question = html`
    <div class="mb-3">
      <p>
        In Playwright, which method automatically waits for elements
        before returning <strong>all matching nodes</strong>?
      </p>
      <label for="${id}" class="form-label">Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
