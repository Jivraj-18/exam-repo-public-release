import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-aggregation";
  const title = "DuckDB Grouped Aggregation";

  const answer = "SELECT region, SUM(revenue) FROM sales GROUP BY region;";

  const question = html`
    <div class="mb-3">
      <p>
        You have a DuckDB table called <code>sales</code> with columns
        <code>region</code> and <code>revenue</code>.
        Which SQL query computes the <strong>total revenue per region</strong>?
      </p>
      <label for="${id}" class="form-label">SQL Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
