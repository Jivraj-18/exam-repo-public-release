import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL Row Count";

  const answer = "SELECT COUNT(*) FROM table_name;";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL query returns the <strong>total number of rows</strong>
        in a table named <code>table_name</code>?
      </p>
      <label for="${id}" class="form-label">Query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
