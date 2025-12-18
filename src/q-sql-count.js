import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-active-users";
  const title = "SQL Conditional Count";

  const answer = "SELECT COUNT(id) FROM customers WHERE status = 'active';";

  const question = html`
    <div class="mb-3">
      <p>
        Write an SQL query to find the number of
        <strong>active customers</strong> in a table named
        <code>customers</code>, where the column
        <code>status</code> stores the user state.
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
