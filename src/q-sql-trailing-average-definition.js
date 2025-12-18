import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-trailing-average-definition";
  const title = "SQL Trailing Average Window Logic";
  const answer = "ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING";

  const question = html`
    <div class="mb-3">
      <p>
        In SQL window functions, which
        <strong>frame clause</strong> correctly computes a
        7-day trailing average while excluding the current row?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
