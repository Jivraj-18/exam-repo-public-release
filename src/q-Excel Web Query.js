import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-scrape-excel-web";
  const title = "Excel Web Import";

  const answer = "Data > Get Data > From Web";

  const question = html`
    <div class="mb-3">
      <p>
        In Excel, which menu path starts the <strong>web scraping query</strong>
        to import tables from websites like weather forecasts?
      </p>
      <label for="${id}" class="form-label">Path:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
