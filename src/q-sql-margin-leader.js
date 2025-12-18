import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-margin-leader";
  const title = "SQL: Profit Margin Leader";

  const answer = "East";

  const question = html`
    <div class="mb-3">
      <p>
        <strong>DataPlus</strong> keeps a sales ledger with 
        <code>region</code>, <code>revenue_usd</code>, and <code>cost_usd</code>.
      </p>
      <p>
        You ran this SQL query:
      </p>
      <pre>
SELECT region,
       SUM(revenue_usd - cost_usd) / SUM(revenue_usd) AS margin
FROM sales
GROUP BY region
ORDER BY margin DESC
LIMIT 1;
      </pre>
      <p>
        Which region achieved the <strong>highest profit margin</strong>?
      </p>
      <label for="${id}" class="form-label">Region:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
