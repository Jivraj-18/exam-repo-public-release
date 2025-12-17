import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-vif";
  const title = "Excel Multicollinearity Check using VIF";

  const answer = "Advertising_Spend";

  const question = html`
    <div class="mb-3">
      <p>
        A regression model in Excel predicts <strong>Monthly Sales</strong> using
        multiple predictors. To ensure model stability, you compute the
        <strong>Variance Inflation Factor (VIF)</strong> for each predictor.
      </p>
      <p>
        Using the auxiliary regressions, which predictor shows the
        <strong>highest VIF</strong>, indicating severe multicollinearity?
      </p>
      <label for="${id}" class="form-label">Predictor name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
