import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-forecast-linear";
  const title = "Forecast Conversion Rate";

  const answer = "0.36";

  const question = html`
    <div class="mb-3">
      <p>
        After computing weekly conversion rates in Excel,
        you used <code>FORECAST.LINEAR</code> to predict
        the conversion rate for week 53.
        What is the forecasted value?
      </p>
      <label for="${id}" class="form-label">Conversion Rate:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
