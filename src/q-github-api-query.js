import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-api-query";
  const title = "GitHub Search Query";

  const answer = "location:Bangalore followers:>100";

  const question = html`
    <div class="mb-3">
      <p>
        When using the GitHub Users Search API, what is the exact <strong>q (query) string</strong> needed to find 
        users located in <strong>Bangalore</strong> with <strong>more than 100</strong> followers?
      </p>
      <label for="${id}" class="form-label">Query String:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., user:name..." />
    </div>
  `;

  return { id, title, weight, question, answer };
}