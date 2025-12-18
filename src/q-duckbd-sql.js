import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-aggregate";
  const title = "DuckDB: Daily Revenue Aggregation";

  const answer = "SELECT order_date, SUM(amount) FROM orders GROUP BY order_date;";

  const question = html`
    <div class="mb-3">
      <p>
        You have a DuckDB table <code>orders</code> with columns:
        <code>order_date</code> and <code>amount</code>.
      </p>
      <p>
        Write a SQL query that computes
        <strong>total revenue per day</strong>.
      </p>
      <label for="${id}" class="form-label">SQL query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
