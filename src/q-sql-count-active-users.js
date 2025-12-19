import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count-users";
  const title = "SQL Count Active Users";

  const answer = "SELECT COUNT(*) FROM users WHERE status = 'active';";

  const question = html`
    <div class="mb-3">
      <p>
        A data analytics team stores user accounts in a table named
        <code>users</code> with a column <code>status</code> that can be
        <code>'active'</code> or <code>'inactive'</code>.
      </p>
      <p>
        Write a single <strong>SQL query</strong> that returns the
        <strong>number of active users</strong> in the table.
      </p>
      <label for="${id}" class="form-label">SQL query:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
