import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-excel-regression-forecast";
  const title = "Regression-Based Sales Forecast";

  const answer = "14820";

  const question = html`
    <div class="mb-3">
      <p>
        Using Excel’s <strong>Regression</strong> tool, you built a model with
        weekly sales as the dependent variable.
        After applying the regression coefficients to a new campaign mix,
        what is the <strong>forecasted weekly sales volume</strong> (units)?
      </p>
      <label for="${id}" class="form-label">Forecasted Units:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
