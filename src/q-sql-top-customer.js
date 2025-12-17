import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sql-top-customer"; // Keep ID to reuse file
  const title = "SQL: Filtering JSON Data";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate logs
  const levels = ["INFO", "WARN", "ERROR"];
  let sqlContent = "CREATE TABLE app_logs (id INTEGER, payload TEXT);\n";
  let errorCount = 0;

  for (let i = 1; i <= 100; i++) {
    const level = levels[Math.floor(random() * levels.length)];
    const service = random() > 0.5 ? "auth" : "payment";
    // Create a JSON string inside the SQL
    const json = JSON.stringify({ level: level, service: service, retry: i % 2 });
    sqlContent += `INSERT INTO app_logs VALUES (${i}, '${json}');\n`;
    
    if (level === "ERROR" && service === "payment") {
      errorCount++;
    }
  }

  const blob = new Blob([sqlContent], { type: "application/sql" });

  const answer = async (response) => {
    if (parseInt(response) !== errorCount) throw new Error(`Incorrect. Expected ${errorCount}.`);
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DevOps: Querying JSON Logs</h2>
      <p>
        Your application stores logs as JSON strings in a <code>payload</code> column. 
        You need to count how many logs have the level "ERROR" specifically for the "payment" service.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the SQL script.</li>
        <li>Load it into a DB (DuckDB/SQLite).</li>
        <li>
          Use JSON extraction functions (e.g., <code>json_extract</code> in SQLite/DuckDB) to filter.
          <br><em>Example:</em> <code>WHERE json_extract(payload, '$.level') = '...'</code>
        </li>
        <li>Count the matching rows.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, "logs.sql")}>
          <i class="bi bi-download"></i> Download logs.sql
        </button>
      </p>
      <label for="${id}" class="form-label">Count of Payment Errors:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}