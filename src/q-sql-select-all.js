import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-select-all";
  const title = "SQL Select All Rows";
  const answer = "SELECT * FROM table_name;";

  const question = html`
    <div class="mb-3">
      <p>
        Write the SQL query to <strong>select all rows</strong>
        from a table named <code>table_name</code>.
      </p>
      <p class="text-muted">
        SQL keywords should be capitalized.
      </p>
    </div>
  `;

  return { id, title, question, answer, weight };
}
