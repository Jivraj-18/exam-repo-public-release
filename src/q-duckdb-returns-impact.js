import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-returns-impact";
  const title = "DuckDB: Returns Impact Summary";

  const answer = "__TABULAR_RESULT__"; // Evaluated against query output

  const question = html`
    <div class="mb-3">
      <p>
        Using <code>orders</code> and <code>returns</code> tables,
        calculate <strong>net revenue</strong> by product category.
      </p>
      <ul>
        <li>Region: <strong>US</strong></li>
        <li>Period: <strong>Q1 2024</strong></li>
        <li>Treat refunded amounts as <strong>negative revenue</strong></li>
      </ul>
      <p>
        Your query must return <strong>exactly one row per category</strong>.
      </p>
      <label for="${id}" class="form-label">
        Enter your DuckDB SQL query:
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="4"></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
