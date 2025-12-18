import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-link-count";
  const title = "HTML Parsing – Count Links";

  const answer = "17";

  const question = html`
    <div class="mb-3">
      <p>
        Crawl the webpage:
        <a href="https://sanand0.github.io/tdsdata/simple_page.html" target="_blank">
          https://sanand0.github.io/tdsdata/simple_page.html
        </a>
      </p>
      <p>
        How many <code>&lt;a&gt;</code> (anchor) tags are present on the page?
      </p>
      <label for="${id}" class="form-label">Number of links:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
