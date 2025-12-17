import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL: Rolling Average Spike Detection";

  const answer = "0.41";

  const question = html`
    <div class="mb-3">
      <p>
        A table <code>daily_signups</code> tracks
        <code>date</code>, <code>region</code>, and <code>signups</code>.
      </p>
      <p>
        Write a SQL query using window functions to compute the
        <strong>7-day trailing average</strong> of signups (excluding current day).
      </p>
      <p>
        For the <strong>APAC</strong> region, what is the
        <strong>maximum positive lift</strong> defined as:
      </p>
      <pre>(signups − trailing_avg) / trailing_avg</pre>
      <label for="${id}" class="form-label">Max lift:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
