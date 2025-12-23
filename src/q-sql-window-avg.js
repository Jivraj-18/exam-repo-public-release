import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-window-avg";
  const title = "Trailing Average with Window Function";

  const answer =
    "AVG(value) OVER (ORDER BY date ROWS BETWEEN 7 PRECEDING AND 1 PRECEDING)";

  const question = html`
    <div class="mb-3">
      <p>
        In SQL, which window function expression computes a
        <strong>7-row trailing average</strong> that excludes the current row?
      </p>
      <label for="${id}" class="form-label">Expression:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
