import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-where";
  const title = "SQL WHERE Clause";

  const answer = "SELECT * FROM orders WHERE amount > 1000;";

  const question = html`
    <div class="mb-3">
      <p>
        Write an SQL query to fetch all rows from
        <code>orders</code> where <code>amount</code>
        is greater than 1000.
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
