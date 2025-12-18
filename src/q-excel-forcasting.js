import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-forecast";
  const title = "Excel: Linear Forecasting";

  const answer = "0.38";

  const question = html`
    <div class="mb-3">
      <p>
        A weekly dataset contains conversion rates for weeks 1–52.
        You used Excel’s <code>FORECAST.LINEAR()</code> function to
        project the value for <strong>week 53</strong>.
      </p>
      <p>
        What is the <strong>forecasted conversion rate</strong> (rounded to two decimals)?
      </p>
      <label for="${id}" class="form-label">Forecast value:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
