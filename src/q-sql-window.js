import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
    const id = "q-sql-window";
    const title = "SQL Trailing Average";

    const answer = "OVER";

    const question = html`
    <div class="mb-3">
      <p>
        Which SQL keyword is required to apply
        <strong>window functions</strong> such as
        a 7-day trailing average?
      </p>
      <label for="${id}" class="form-label">Keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    return { id, title, weight, question, answer };
}
