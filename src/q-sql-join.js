import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-join";
  const title = "SQL INNER JOIN Query";

  const answer = "SELECT users.name, orders.order_id FROM users INNER JOIN orders ON users.id = orders.user_id;";

  const question = html`
    <div class="mb-3">
      <p>
        Write an SQL query to retrieve <code>name</code> from the <code>users</code>
        table and <code>order_id</code> from the <code>orders</code> table using an
        <strong>INNER JOIN</strong> on <code>users.id = orders.user_id</code>.
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
