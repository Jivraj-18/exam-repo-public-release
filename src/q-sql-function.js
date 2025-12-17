import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sql-date";
  const title = "SQL Date Extraction";

  const answer = "YEAR(order_date)";

  const question = html`
    <div class="mb-3">
      <p>
        Which SQL expression extracts the <strong>year</strong>
        from a column named <code>order_date</code>?
      </p>
      <label for=${id} class="form-label">SQL Expression:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
