import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-browser";
  const title = "Playwright Browser Engine";

  const answer = "chromium";

  const question = html`
    <div class="mb-3">
      <p>
        Which Playwright browser engine is used when calling
        <code>p.chromium.launch()</code>?
      </p>
      <label for="${id}" class="form-label">Browser engine:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
