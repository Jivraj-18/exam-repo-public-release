import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-date-normalisation";
  const title = "Excel: Date Normalisation";

  const answer = "DATEVALUE";

  const question = html`
    <div class="mb-3">
      <p>
        An Excel column contains dates stored as text in mixed formats such as
        <code>2024-03-15</code>, <code>15/03/2024</code>, and <code>Mar 15, 2024</code>.
      </p>
      <p>
        Which Excel function converts a date stored as text into a real
        date value that Excel can recognize?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
