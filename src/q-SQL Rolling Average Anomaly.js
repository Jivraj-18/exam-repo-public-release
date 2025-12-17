import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-rolling-lift";
  const title = "SQL: Rolling Average Lift Detection";

  const answer = "0.45";

  const question = html`
    <div class="mb-3">
      <p>
        A table <code>daily_metrics</code> tracks
        <code>metric_date</code>, <code>region</code>, and <code>signups</code>.
      </p>
      <p>
        You compute a 7-day trailing average of signups (excluding the current day)
        using a SQL window function.
      </p>
      <p>
        On one day, the region <strong>APAC</strong> records 145 signups
        against a trailing average of 100.
      </p>
      <p>
        What is the <strong>signup lift</strong>?
        <br />
        <em>(lift = (actual − average) / average)</em>
      </p>
      <label for="${id}" class="form-label">Lift (decimal):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}