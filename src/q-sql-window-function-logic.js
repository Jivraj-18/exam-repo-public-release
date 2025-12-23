import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window-purpose";
  const title = "SQL Window Function Purpose";

  const answer = "rolling average";

  const question = html`
    <div class="mb-3">
      <p>
        In SQL, a query using
        <code
          >AVG(value) OVER (ORDER BY date ROWS BETWEEN 7 PRECEDING AND 1
          PRECEDING)</code
        >
        is commonly used to compute a __________.
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
