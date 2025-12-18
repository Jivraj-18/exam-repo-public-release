import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-python-seasonality-pattern";
  const title = "Python: Seasonal Revenue Pattern Analysis";

  const answer = "Q4";

  const question = html`
    <div class="mb-3">
      <h5>RetailPulse: Quarterly Revenue Seasonality</h5>
      <p>
        RetailPulse operates 50 stores across 3 regions. They want to understand which 
        quarter consistently shows the highest year-over-year growth rate to optimize 
        inventory planning for the next fiscal year.
      </p>
      
      <h6>Dataset Schema</h6>
      <ul>
        <li><code>store_id</code>: Store identifier (S001-S050)</li>
        <li><code>transaction_date</code>: Date of transaction (2022-2024)</li>
        <li><code>revenue_usd</code>: Daily revenue per store</li>
        <li><code>region</code>: North, South, East</li>
      </ul>

      <h6>Python Task</h6>
      <ol>
        <li>Load CSV and extract quarter from transaction_date using pd.to_datetime()</li>
        <li>Group by year and quarter, sum revenue across all stores</li>
        <li>Calculate YoY growth rate: (revenue_current - revenue_previous) / revenue_previous</li>
        <li>Average the growth rates across years for each quarter</li>
        <li>Identify which quarter (Q1, Q2, Q3, Q4) has highest average YoY growth</li>
      </ol>

      <label for="${id}" class="form-label">
        Which quarter shows the strongest average year-over-year growth?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="Q1, Q2, Q3, or Q4"
      />
      <small class="form-text text-muted">
        Use pandas groupby with pd.Grouper(freq='Q') and pct_change() for YoY calculations
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}