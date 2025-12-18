import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-where";
  const title = "SQL WHERE Clause";

  const answer = "WHERE";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL keyword is used to filter rows based on a condition?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
