import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window-sum";
  const title = "SQL: Cumulative Revenue Tracking";

  const answer = "ORDER BY";

  const question = html`
    <div class="mb-3">
      <p>
        To calculate a <strong>running total</strong> of revenue over time in SQL, you use the <code>SUM(revenue) OVER (...)</code> syntax. 
        Which specific clause must be present inside the <code>OVER</code> parentheses to ensure the sum accumulates chronologically?
      </p>
      <label for="${id}" class="form-label">SQL Clause:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="CLAUSE column_name" />
    </div>
  `;

  return { id, title, weight, question, answer };
}