import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-python-scrape-lib";
    const title = "Python Web Scraping Library";

    const answer = "BeautifulSoup";

    const question = html`
    <div class="mb-3">
      <p>
        Which Python library is most commonly used to
        <strong>parse and extract data from HTML</strong>
        after downloading a web page?
      </p>
      <label for="${id}" class="form-label">Library name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
