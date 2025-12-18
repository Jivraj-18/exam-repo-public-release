import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-regression";
  const title = "Excel: Weekly Sales Forecast Using Regression";

  const answer = "14280";

  const question = html`
    <div class="mb-3">
      <p>
        A retailer built a multiple linear regression model in Excel with
        <strong>Weekly Sales</strong> as the dependent variable and
        <strong>Price</strong>, <strong>Discount</strong>, and
        <strong>Ad Spend</strong> as predictors.
      </p>
      <p>
        Using the regression coefficients, the forecasted weekly sales
        for a new promotional mix is calculated.
      </p>
      <p><strong>What is the predicted weekly sales volume?</strong></p>
      <label for="${id}" class="form-label">Forecast (units):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
