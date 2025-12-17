import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-gross-margin";
  const title = "DuckDB: Gross Margin Computation";

  const answer = "Robotics";

  const question = html`
    <div class="mb-3">
      <p>
        A DuckDB analysis joins <code>shipments</code> and <code>product_master</code>
        tables to calculate category-level performance.
      </p>
      <p>
        Gross margin is computed as:
        <br />
        <code>(revenue − cost) / revenue</code>
      </p>
      <p>
        After filtering shipments to dates after <strong>2024-06-01</strong>,
        which product category achieves the <strong>highest gross margin</strong>?
      </p>
      <label for="${id}" class="form-label">Category name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}