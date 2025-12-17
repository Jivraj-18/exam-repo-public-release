import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-json-analytics";
  const title = "DuckDB Analytics on Nested JSON Logs";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a directory containing JSON Lines files
        (<code>.jsonl</code>) where each line represents a web event:
      </p>

      <pre><code>{
  "user": { "id": "u123", "region": "EU" },
  "event": { "type": "purchase", "value": 49.99 },
  "timestamp": "2024-08-12T10:15:30Z"
}</code></pre>

      <p>
        Using <strong>DuckDB</strong>, write a SQL query that:
      </p>

      <ol>
        <li>Reads all <code>.jsonl</code> files from a directory using <code>read_json_auto</code></li>
        <li>Filters to users in the <strong>EU</strong> region</li>
        <li>Considers only events of type <code>purchase</code></li>
        <li>Computes the <strong>total purchase value per user</strong></li>
        <li>Returns users whose total purchase value exceeds <code>100</code></li>
      </ol>

      <p>
        <strong>Answer format:</strong>  
        Enter only the DuckDB SQL query.
      </p>

      <label for="${id}" class="form-label">DuckDB SQL:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="4"
        placeholder="SELECT ..."
      ></textarea>
    </div>
  `;

  const answer = null;

  return { id, title, weight, question, answer };
}
