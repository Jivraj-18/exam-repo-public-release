import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-html-data-table";
  const title = "Displaying Tabular Data in HTML";

  const answer = "table";

  const question = html`
    <div class="mb-3">
      <p>
        When designing a webpage that displays structured data in rows and
        columns, which HTML element should be used as the container?
      </p>
      <label for="${id}" class="form-label">HTML Element:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
