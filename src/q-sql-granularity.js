import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-granularity";
  const title = "SQL Granularity Mismatch";

  const answer = "Double counting";

  const question = html`
    <div class="mb-3">
      <p>
        A SQL query joins monthly revenue data to daily user activity data
        and then sums revenue without adjusting granularity.
      </p>
      <p>
        What analytical issue does this introduce?
      </p>
      <label for="${id}" class="form-label">Issue:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
