import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-date-filter";
  const title = "DuckDB: Date Range Filtering";

  const answer = "WHERE order_date BETWEEN DATE '2024-06-01' AND DATE '2024-06-30'";

  const question = html`
    <div class="mb-3">
      <p>
        You are querying a DuckDB table named <code>orders</code> with a column
        <code>order_date</code> of type DATE.
      </p>
      <p>
        Which SQL clause correctly filters rows to include only orders placed
        in <strong>June 2024</strong>?
      </p>
      <label for="${id}" class="form-label">SQL clause:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
