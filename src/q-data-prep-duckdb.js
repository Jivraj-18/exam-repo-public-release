import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-data-prep-duckdb";
  const title = "DuckDB CSV Query";

  const answer = "SELECT COUNT(*) FROM read_csv_auto('sales.csv') WHERE revenue < 0";

  const question = html`
    <div class="mb-3">
      <p>
        You have a large CSV file <code>sales.csv</code> with a numeric column
        <code>revenue</code>.
      </p>
      <p>
        Write a <strong>single DuckDB SQL query</strong> that counts how many rows
        have a negative revenue value without importing the file into memory.
      </p>
      <label for="${id}" class="form-label">SQL query:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}

