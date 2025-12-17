// File: q-duckdb-gross-margin.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-gross-margin";
  const title = "DuckDB Gross Margin Leader";
  const answer = "Electronics";

  const question = html`
    <div class="mb-3">
      <p>
        After joining <code>shipments</code> and <code>sku_master</code> in DuckDB
        and filtering records after <code>2024-05-15</code>, which
        <strong>category</strong> achieved the highest gross margin?
      </p>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
