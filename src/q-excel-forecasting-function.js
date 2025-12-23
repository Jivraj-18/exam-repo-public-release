import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-forecast-linear";
  const title = "Excel Linear Forecasting";

  const answer = "FORECAST.LINEAR";

  const question = html`
    <div class="mb-3">
      <p>
        Which Excel function should be used to predict a future value assuming a
        <strong>linear trend</strong> between known X and Y values?
      </p>
      <label for="${id}" class="form-label">Excel function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
