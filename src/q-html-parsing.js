import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bs4-selector";
  const title = "BeautifulSoup Selector";

  const answer = "soup.find_all('table')";

  const question = html`
    <div class="mb-3">
      <p>
        Using BeautifulSoup in Python, which statement selects
        <strong>all table elements</strong> from an HTML document?
      </p>
      <label for="${id}" class="form-label">Code:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
