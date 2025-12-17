import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-web-scraping-rate-limit";
  const title = "Web Scraping: Handling Rate Limits";

  const answer = "exponential backoff";

  const question = html`
    <div class="mb-3">
      <p>
        When a website returns HTTP <code>429 Too Many Requests</code> during
        web scraping, what retry strategy should be used to avoid being blocked?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
