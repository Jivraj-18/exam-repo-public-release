import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-rolling-lift";
  const title = "SQL: Rolling Activation Lift";

  const answer = "0.42";

  const question = html`
    <div class="mb-3">
      <p>
        Daily activations were analyzed using SQL window functions.
        A 5-day trailing average (excluding the current day) was used.
      </p>
      <p>
        On a given day, activations were <strong>142</strong>, and the
        prior 5-day trailing average was <strong>100</strong>.
      </p>
      <p>
        Lift is defined as:
        <code>(today - trailing_avg) / trailing_avg</code>
      </p>
      <label for="${id}" class="form-label">Maximum lift (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
