import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "duckdb_revenue_quality";
  const title = "DuckDB: Revenue Quality Diagnostics";

  const answer = "json";

  const question = html`
    <div class="mb-3">
      <p>
        Finance suspects overstated revenue due to refunds not being netted correctly.
      </p>
      <p>
        Using DuckDB, compute net revenue for EU orders between
        <code>2024-05-01</code> and <code>2024-06-30</code>, ignoring refunds with
        reason <code>fraud_writeoff</code>.
      </p>
      <p>
        Return a JSON object containing:
        <code>order_count</code>, <code>gross_revenue</code>,
        <code>refunded_amount</code>, <code>net_revenue</code>,
        <code>refund_rate</code>.
      </p>
      <label for="${id}" class="form-label">Result (JSON):</label>
      <textarea class="form-control" id="${id}" name="${id}"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
