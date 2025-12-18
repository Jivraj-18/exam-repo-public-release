import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-playwright-purpose";
  const title = "Why Use Playwright?";

  const answer = "JavaScript rendering";

  const question = html`
    <div class="mb-3">
      <p>
        What is the primary reason for using <strong>Playwright</strong>
        instead of <code>requests</code> or <code>httpx</code>
        when scraping modern websites?
      </p>
      <label for="${id}" class="form-label">Reason:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
