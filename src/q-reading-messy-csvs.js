import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-ignore-errors";
  const title = "DuckDB: Handling Corrupt CSVs";

  const answer = "ignore_errors=true";

  const question = html`
    <div class="mb-3">
      <p>
        When working with the <code>messy_orders.csv</code> file in DuckDB, standard parsing might fail 
        due to malformed rows. According to the "Reading Messy CSV" section, what specific 
        parameter must you pass to the <code>read_csv_auto</code> function to skip bad lines 
        instead of crashing?
      </p>
      <div class="code-snippet" style="background: #f4f4f4; padding: 10px; margin-bottom: 10px; font-family: monospace;">
        SELECT * FROM read_csv_auto('messy_orders.csv', <input style="width: 150px; display: inline-block;" class="form-control form-control-sm" id="${id}" name="${id}" />);
      </div>
      <small class="text-muted">Enter the parameter and value (e.g., param=value).</small>
    </div>
  `;

  return { id, title, weight, question, answer };
}