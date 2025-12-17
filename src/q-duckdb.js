import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-agg";
  const title = "DuckDB: Revenue by region";

  const answer = "SELECT region, SUM(amount) FROM sales GROUP BY region;";

  const question = html`
    <div class="mb-3">
      <p>
        A DuckDB table <code>sales</code> has columns
        <code>region</code> and <code>amount</code>.
      </p>
      <p>
        Write a SQL query that returns the <strong>total revenue per region</strong>.
      </p>
      <label for="${id}" class="form-label">SQL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
