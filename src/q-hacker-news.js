import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-hn-rss-search";
  const title = "Hacker News RSS Search";

  const answer = "https://hnrss.org/newest?q=python&points=50";

  const question = html`
    <div class="mb-3">
      <p>
        You want to fetch the <strong>newest Hacker News posts</strong>
        mentioning <strong>Python</strong> with at least <strong>50 points</strong>
        using the HNRSS API.
      </p>
      <p>
        What is the correct API URL?
      </p>
      <label for="${id}" class="form-label">URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
