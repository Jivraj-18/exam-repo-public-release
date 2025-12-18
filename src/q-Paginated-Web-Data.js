import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pagination";
  const title = "Paginated Data";

  const answer = "page";

  const question = html`
    <div class="mb-3">
      <p>
        When scraping data from a website that spans multiple pages,
        which URL parameter is commonly used to navigate
        <strong>pagination</strong>?
      </p>
      <label for="${id}" class="form-label">Parameter:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
