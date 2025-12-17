import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL: Trailing Average with Window Functions";

  const answer = "ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING";

  const question = html`
    <div class="mb-3">
      <p>
        To calculate a <strong>7-day trailing average</strong> of daily signups
        while excluding the current day in SQL, which window frame should be used?
      </p>
      <label for="${id}" class="form-label">Window Frame:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}