import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-margin";
  const title = "DuckDB: Category Gross Margin Leader";

  const answer = "Data Platforms";

  const question = html`
    <div class="mb-3">
      <p>
        Using DuckDB, you joined shipment data with a SKU cost table and
        calculated gross margin by category as:
      </p>
      <p>
        <code>(SUM(revenue) - SUM(cost)) / SUM(revenue)</code>
      </p>
      <p>
        After filtering shipments to dates after <strong>2024-06-01</strong>,
        which category achieved the <strong>highest gross margin</strong>?
      </p>
      <label for="${id}" class="form-label">Category:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
