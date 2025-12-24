import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape-imdb";
  const title = "IMDb JavaScript Scraping";

  const answer = 'document.querySelectorAll(".ipc-title__text").map(e=>e.textContent)';

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript extracts <strong>all movie titles</strong> from IMDb
        Top 250 using <strong>querySelectorAll</strong> in browser console?
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
