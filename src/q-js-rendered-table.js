// Created by 23f2001207

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-js-table-sum";
  const title = "JavaScript Rendered Table";

  const answer = "420";

  const question = html`
    <div class="mb-3">
      <p>
        Visit the page below. The table is rendered using JavaScript:
      </p>
      <p>
        <a href="https://sanand0.github.io/tdsdata/js_table/" target="_blank">
          https://sanand0.github.io/tdsdata/js_table/
        </a>
      </p>
      <p>
        Compute the sum of <strong>only EVEN numbers</strong> present in the
        <strong>last column</strong> of the table.
      </p>
      <label for="${id}" class="form-label">Sum:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
