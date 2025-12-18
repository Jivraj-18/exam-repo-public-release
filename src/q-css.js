import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-bs4-selectors";
  const title = "Python BeautifulSoup Selectors";

  const answer = "select_one";

  const question = html`
    <div class="mb-3">
      <p>
        In the <strong>BeautifulSoup</strong> library, if you want to find only the 
        <strong>first</strong> element that matches a specific CSS selector, which method 
        is more modern and preferred over <code>find()</code>?
      </p>
      <label for="${id}" class="form-label">Method Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}