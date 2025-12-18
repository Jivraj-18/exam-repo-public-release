import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-margin";
  const title = "Revenue Leakage Audit";
  const answer = "0.25";
  const question = html`
    <div class="mb-3">
      <p>During a profitability audit, a SQL developer needs to find the gross margin of a deal. If the <code>SUM(revenue_usd)</code> is $1,000,000 and the <code>SUM(cost_usd)</code> is $750,000, what is the resulting gross margin expressed as a <b>decimal</b>?</p>
      <label for="${id}" class="form-label">Calculated Margin:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 0.5" />
    </div>
  `;

  return { id, title, weight, question, answer };
}