import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hn-rss";
  const title = "Hacker News RSS API";

  const answer = "https://hnrss.org/newest?q=AI&points=50";

  const question = html`
    <div class="mb-3">
      <p>
        Which HNRSS API URL fetches the <strong>newest Hacker News posts</strong>
        mentioning <strong>AI</strong> with at least <strong>50 points</strong>?
      </p>
      <label for="${id}" class="form-label">URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
