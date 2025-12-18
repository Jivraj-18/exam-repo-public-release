import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-create-table";
  const title = "Create SQL Table";

  const answer = "CREATE TABLE";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL keyword is used to create a new table in a database?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
