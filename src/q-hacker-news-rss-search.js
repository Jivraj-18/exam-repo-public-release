import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hn-rss";
  const title = "Hacker News RSS API";

  const answer = "https://hnrss.org/newest?q=Python&points=50";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>Hacker News RSS URL</strong> fetches the newest posts
        mentioning <strong>Python</strong> with at least <strong>50 points</strong>?
      </p>
      <label for="${id}" class="form-label">RSS URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
