import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hnrss-url";
  const title = "Hacker News RSS Search";

  const answer = "https://hnrss.org/newest?q=python&points=50";

  const question = html`
    <div class="mb-3">
      <p>
        What is the correct HNRSS API URL to fetch the newest Hacker News posts
        mentioning <strong>python</strong> with at least <strong>50 points</strong>?
      </p>
      <label for="${id}" class="form-label">RSS URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
