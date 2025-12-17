import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL Window Frame Specification";

  const answer = "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW";

  const question = html`
    <div class="mb-3">
      <p>
        You are calculating a moving average in SQLite. You want to define a window frame 
        that includes the <strong>current row and the 2 rows immediately before it</strong>.
      </p>
      <p>
        Complete the SQL clause:
      </p>
      <div class="card p-3 bg-light">
        <code>OVER (ORDER BY date ________________________________________)</code>
      </div>
      <br />
      <label for="${id}" class="form-label">Missing Clause (uppercase):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}