import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-web-scraping";
  const title = "Web Scraping Source";

  const answer = "HTML";

  const question = html`
    <div class="mb-3">
      <p>
        When performing web scraping, which type of document
        is typically downloaded and parsed to extract data
        from websites?
      </p>
      <label for="${id}" class="form-label">Document type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
