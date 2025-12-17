import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-margin";
  const title = "DuckDB: Highest Margin Product Category";

  const answer = "Automation";

  const question = html`
    <div class="mb-3">
      <p>
        Two CSV files are provided: <code>products.csv</code> (category, cost)
        and <code>sales.csv</code> (units, price, sale_date).
      </p>
      <p>
        Using DuckDB, filter sales to dates after
        <strong>2024-06-01</strong>, join with products, and compute
        gross margin by category:
      </p>
      <pre>(revenue − cost) ÷ revenue</pre>
      <p>
        Which category has the <strong>highest gross margin</strong>?
      </p>
      <label for="${id}" class="form-label">Category:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
