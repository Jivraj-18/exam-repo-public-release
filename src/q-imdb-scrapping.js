import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-imdb-js";
  const title = "Scrape IMDb with Browser JavaScript";

  const answer = 'document.querySelectorAll(".ipc-metadata-list-summary-item")';

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript selector fetches all movie rows from the
        <strong>IMDb Top 250</strong> page?
      </p>
      <label for="${id}" class="form-label">Selector:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
