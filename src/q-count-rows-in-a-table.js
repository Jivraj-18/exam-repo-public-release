import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-count";
  const title = "SQL: Count Records";

  const answer = "COUNT(*)";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL aggregate function returns the <strong>total number of rows</strong>
        in a table?
      </p>
      <label for="${id}" class="form-label">SQL function:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
