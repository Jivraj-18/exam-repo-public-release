import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-impute";
  const title = "DuckDB: Handle Missing Values";

  const answer =
    "SELECT COALESCE(customer, 'Unknown') AS customer, SUM(amount) FROM orders GROUP BY 1";

  const question = html`
    <div class="mb-3">
      <p>
        In a DuckDB table <code>orders(customer, amount)</code>, some
        <code>customer</code> values are NULL.
      </p>
      <p>
        Write a SQL query that replaces NULL customers with
        <code>'Unknown'</code> and computes the <strong>total amount per customer</strong>.
      </p>
      <label for="${id}" class="form-label">SQL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
