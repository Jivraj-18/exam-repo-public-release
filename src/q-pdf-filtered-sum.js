// Created By 23f2001207

import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pdf-marks-sum";
  const title = "PDF Table Filtering";

  const answer = "356";

  const question = html`
    <div class="mb-3">
      <p>
        Download and extract the table from this PDF:
      </p>
      <p>
        <a href="https://sanand0.github.io/tdsdata/marks.pdf" target="_blank">
          https://sanand0.github.io/tdsdata/marks.pdf
        </a>
      </p>
      <p>
        From the table:
      </p>
      <ul>
        <li>Select students with <strong>Math ≥ 70</strong></li>
        <li>Sum their <strong>Chemistry</strong> marks</li>
      </ul>
      <label for="${id}" class="form-label">Total Marks:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
