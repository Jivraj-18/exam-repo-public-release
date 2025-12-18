import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-date";
  const title = "DuckDB: Date Filtering";

  const answer = "SELECT * FROM orders WHERE order_date >= '2024-01-01';";

  const question = html`
    <div class="mb-3">
      <p>
        Write a DuckDB SQL query to select all rows from the
        <code>orders</code> table where <strong>order_date</strong>
        is on or after January 1, 2024.
      </p>
      <label for="${id}" class="form-label">SQL Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
