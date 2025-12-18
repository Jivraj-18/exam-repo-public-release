import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
export default async function ({ user, weight = 1 }) {
  const id = "q-sql-lag";
  const title = "SQL Window Functions";

  const answer = "LAG";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL window function allows you to access data from a 
        <strong>previous row</strong> in the same result set, commonly used to 
        calculate month-over-month growth?
      </p>
      <label for="${id}" class="form-label">Function Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}