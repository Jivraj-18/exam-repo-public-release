import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-queryselector";
  const title = "Browser Scraping Selector";

  const answer = 'document.querySelectorAll("table tbody tr")';

  const question = html`
    <div class="mb-3">
      <p>
        In browser JavaScript, which command selects
        <strong>all rows inside a table body</strong>
        using <code>querySelectorAll</code>?
      </p>
      <label for="${id}" class="form-label">JavaScript:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}