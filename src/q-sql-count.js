import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL COUNT Query";

  const answer = "SELECT COUNT(*) FROM users;";

  const question = html`
    <div class="mb-3">
      <p>
        Write an SQL query to count the total number of rows
        in a table named <code>users</code>.
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}