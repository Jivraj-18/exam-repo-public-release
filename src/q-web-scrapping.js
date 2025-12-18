import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-css-selector";
  const title = "Select Table Rows";

  const answer = "table tr";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>CSS selector</strong> selects all table rows
        from every table on an HTML page?
      </p>
      <label for="${id}" class="form-label">CSS selector:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
