import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-imdb-selector";
  const title = "IMDb DOM Selection";

  const answer = "document.querySelectorAll";

  const question = html`
    <div class="mb-3">
      <p>
        Which JavaScript method is commonly used in the browser
        to select <strong>multiple DOM elements</strong> when scraping IMDb?
      </p>
      <label for="${id}" class="form-label">Method:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
