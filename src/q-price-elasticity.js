import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-price-elasticity";
  const title = "DuckDB: Top SKU Price Elasticity";

  // Expected answer format: SKU ID (e.g., "A492")
  const answer = "SKU ID (e.g., A492)";

  const question = html`
    <div class="mb-3">
      <p>
        You have an orders Parquet file with columns: <code>sku_id</code>,
        <code>price</code>, <code>units_sold</code>, <code>date</code>. Use
        DuckDB (read Parquet directly) to compute price elasticity per SKU by
        running a log-log regression: <code>log(units_sold) ~ log(price)</code>.
      </p>

      <p><strong>Task</strong></p>
      <ol>
        <li>Filter out rows with units_sold &lt;= 0 or non-positive price.</li>
        <li>
          For each sku_id, run a small regression or compute slope via linear
          regression on log values.
        </li>
        <li>
          Identify the SKU with the most negative elasticity (most elastic).
        </li>
      </ol>

      <p>
        Which <strong>sku_id</strong> has the most elastic demand (most negative
        elasticity coefficient)?
      </p>

      <label for="${id}" class="form-label">SKU id:</label>
      <input class="form-control" id="${id}" name="${id}" />
      <small class="form-text text-muted">
        Example answer format: <code>A492</code>
      </small>
    </div>
  `;

  return { id, title, weight, question, answer };
}
