import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-margin";
  const title = "DuckDB Cost-Weighted Margin Leader";

  const answer = "Cloud Security";

  const question = html`
    <div class="mb-3">
      <p>
        Using DuckDB, you analyze post-launch sales by product category.
        Instead of simple gross margin, you compute a
        <strong>cost-weighted margin</strong>:
      </p>
      <p>
        <code>SUM(revenue - cost) / SUM(cost)</code>
      </p>
      <p>
        Which category delivers the <strong>highest cost-weighted margin</strong>
        after <strong>2024-06-01</strong>?
      </p>
      <label for="${id}" class="form-label">Category:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
