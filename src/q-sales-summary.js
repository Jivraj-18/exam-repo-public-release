import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-aggregate";
  const title = "DuckDB Sales Summary";
  const answer = "SELECT region, SUM(amount) as total FROM sales GROUP BY region";
  
  const question = html`
    <div class="mb-3">
      <p>
        Table <code>sales</code> has columns: <code>order_id, region, amount, date</code>.
        Write a DuckDB query to calculate <strong>total sales by region</strong>.
      </p>
      <label for="${id}" class="form-label">SQL Query:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3" 
                placeholder="SELECT ..."></textarea>
      <small class="form-text text-muted">Use GROUP BY to aggregate by region</small>
    </div>
  `;
  
  return { id, title, weight, question, answer };
}