import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-forecasting-ets";
  const title = "Excel: Seasonal Demand Forecasting";

  const answer = "FORECAST.ETS";

  const question = html`
    <div class="mb-3">
      <p>
        You have 24 months of sales data showing strong seasonality. Which Excel function should you use to predict next month's sales while 
        <strong>automatically detecting seasonal patterns</strong> using Triple Exponential Smoothing?
      </p>
      <label for="${id}" class="form-label">Excel Function Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., SUM" />
    </div>
  `;

  return { id, title, weight, question, answer };
}