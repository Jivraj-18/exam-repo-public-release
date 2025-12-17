import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window";
  const title = "SQL: Trailing Average";

  const answer = "AVG";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL aggregate function is used inside a
        <strong>window function</strong>
        to compute a 7-day trailing average?
      </p>
      <label for="${id}" class="form-label">Function name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
