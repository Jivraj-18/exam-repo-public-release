import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-aggregation";
  const title = "DuckDB: Monthly Order Summary";

  const answer = "0.36";

  const question = html`
    <div class="mb-3">
      <p>
        You are querying a DuckDB table <code>orders</code> containing
        <code>order_id</code>, <code>order_date</code>, <code>amount</code>,
        and <code>region</code>.
      </p>
      <p>
        For customers in the <strong>APAC</strong> region who placed orders in
        <strong>March 2024</strong>, compute:
      </p>
      <ul>
        <li>Total number of orders</li>
        <li>Number of orders above $500</li>
      </ul>
      <p>
        What is the <strong>ratio</strong> of high-value orders to total orders?
      </p>
      <label for="${id}" class="form-label">Ratio:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
