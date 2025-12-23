import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-json-transform";
  const title = "DuckDB: Transform nested JSON to analytics-ready tables";

  const random = seedrandom(`${user.email}#${id}`);
  const minWeeks = Math.floor(random() * 3) + 4; // 4-6 weeks of output

  const answer = async (csvText) => {
    try {
      if (!csvText || typeof csvText !== "string") {
        throw new Error("Please paste your CSV data");
      }

      const lines = csvText.trim().split(/\r?\n/);
      if (lines.length < minWeeks + 1) {
        throw new Error(`CSV must have at least ${minWeeks} data rows (plus header)`);
      }

      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
      const required = ["week", "aov", "repeat_rate"];
      const missing = required.filter((h) => !headers.includes(h));
      if (missing.length) {
        throw new Error(`CSV must include headers: ${required.join(", ")}`);
      }

      // Validate at least one data row has numeric values
      if (lines.length > 1) {
        const firstDataRow = lines[1].split(",");
        const aovIdx = headers.indexOf("aov");
        const repeatIdx = headers.indexOf("repeat_rate");
        if (aovIdx >= 0 && isNaN(parseFloat(firstDataRow[aovIdx]))) {
          throw new Error("AOV column must contain numeric values");
        }
        if (repeatIdx >= 0 && isNaN(parseFloat(firstDataRow[repeatIdx]))) {
          throw new Error("Repeat rate column must contain numeric values");
        }
      }

      return true;
    } catch (error) {
      throw new Error(`CSV validation failed: ${error.message}`);
    }
  };

  const question = html`
    <div class="mb-3">
      <h2>Transform nested orders JSON in DuckDB</h2>
      <p>
        Ingest nested <strong>orders JSON</strong> into DuckDB, flatten it, and compute weekly KPIs: Average Order
        Value (AOV) and Repeat Rate. Export results to <code>metrics.csv</code>.
      </p>
      <h3>What to submit</h3>
      <p>Paste the contents of your <code>metrics.csv</code> file into the text area below.</p>

      <h3>Steps to solve</h3>
      <ol>
        <li>Create or obtain nested orders JSON data (with customer_id, order_date, order_amount, items).</li>
        <li>In DuckDB, use <code>read_json_auto</code> or <code>read_json</code> to load the file into a table.</li>
        <li>Flatten nested arrays (e.g., items) using <code>json_each</code> or <code>unnest</code>; cast dates to DATE type.</li>
        <li>Compute per-week KPIs:
          <ul>
            <li><strong>week:</strong> <code>date_trunc('week', order_date)</code></li>
            <li><strong>aov:</strong> <code>sum(order_amount) / count(*)</code> (average order value)</li>
            <li><strong>repeat_rate:</strong> proportion of customers with more than 1 order that week</li>
          </ul>
        </li>
        <li>Export to CSV with headers <code>week,aov,repeat_rate</code> and at least <strong>${minWeeks}</strong> weekly rows.</li>
        <li>Copy the entire CSV content and paste it below.</li>
      </ol>

      <h3>Example CSV format</h3>
      <pre><code>week,aov,repeat_rate
2024-01-01,125.50,0.35
2024-01-08,132.75,0.42
...</code></pre>

      <label for="${id}" class="form-label">Paste your metrics CSV content</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="8"
        required
        placeholder="week,aov,repeat_rate
2024-01-01,125.50,0.35
2024-01-08,132.75,0.42"
      ></textarea>
      <p class="text-muted">We will validate the CSV has the required headers (<code>week,aov,repeat_rate</code>) and at least ${minWeeks} data rows with numeric KPIs.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
