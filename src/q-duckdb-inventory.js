import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-inventory";
  const title = "DuckDB: Multi-Level Inventory Turnover Diagnostics";

  const question = html`
    <div class="mb-3">
      <h4>DuckDB: Multi-Level Inventory Turnover Diagnostics (1 mark)</h4>
      
      <h5>Problem Statement</h5>
      <p>
        A retail company wants to diagnose inefficient inventory usage across regions and categories using 
        SQL-based analytics.
      </p>

      <h5>Input</h5>
      <p>A CSV file <code>inventory.csv</code> with columns:</p>
      <ul>
        <li><code>date</code></li>
        <li><code>region</code></li>
        <li><code>category</code></li>
        <li><code>units_sold</code></li>
        <li><code>avg_inventory</code></li>
      </ul>

      <h5>Constraints</h5>
      <ul>
        <li>You must use DuckDB SQL only (no pandas).</li>
        <li>Window functions are mandatory.</li>
        <li>Do not materialize intermediate tables.</li>
      </ul>

      <h5>Task</h5>
      <ol>
        <li>Compute monthly inventory turnover:
          <ul>
            <li><code>turnover = units_sold / avg_inventory</code></li>
          </ul>
        </li>
        <li>For each <code>(region, category)</code> pair:
          <ul>
            <li>Compute a 3-month rolling average turnover</li>
          </ul>
        </li>
        <li>Identify all <code>(region, category)</code> pairs where:
          <ul>
            <li>Rolling turnover decreased for 3 consecutive months</li>
          </ul>
        </li>
      </ol>

      <h5>Output</h5>
      <p>A DuckDB query that outputs a table with:</p>
      <ul>
        <li><code>region</code></li>
        <li><code>category</code></li>
        <li><code>start_month</code></li>
        <li><code>end_month</code></li>
      </ul>

      <label for="${id}" class="form-label">Upload your solution file</label>
      <input class="form-control" id="${id}" name="${id}" type="file" />
    </div>
  `;

  const answer = async (file) => {
    if (!file) throw new Error("Solution file is required");
    return true;
  };

  return { id, title, weight, question, answer };
}
