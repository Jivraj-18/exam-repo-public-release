import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-multivariate-regression-forecast";
  const title = "Excel Multivariate Sales Forecast";
  const answer = "18420";

  const question = html`
    <div class="mb-3">
      <p>
        Using Excel’s <strong>Regression</strong> tool with price, discount,
        ad spend, and in-store events as predictors,
        what is the <strong>forecasted weekly sales (units)</strong>
        for the proposed promotional mix?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
