import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window-avg";
  const title = "SQL Trailing Average Window";

  const answer =
    "AVG(value) OVER (PARTITION BY category ORDER BY date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)";

  const question = html`
    <div class="mb-3">
      <p>
        Write an SQL window function expression that computes a
        <strong>7-row trailing average</strong> (excluding the current row),
        partitioned by <code>category</code> and ordered by <code>date</code>.
      </p>
      <label for="${id}" class="form-label">SQL expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
