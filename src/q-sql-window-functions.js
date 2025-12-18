import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL Trailing Average Window";

  const answer = "ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING";

  const question = html`
    <div class="mb-3">
      <p>
        You are calculating a <strong>7-day trailing average</strong> in SQL
        that must exclude the current day.
      </p>
      <p>
        Which window frame clause correctly implements this logic?
      </p>
      <label for="${id}" class="form-label">Window frame:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
