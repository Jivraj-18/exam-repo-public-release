import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-sql-query-challenge";
  const title = "SQL Query: Customer Lifetime Value";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate customer transaction data
  const customers = ["C001", "C002", "C003", "C004", "C005"];
  const rows = [["customer_id", "transaction_date", "amount", "status"]];
  
  let targetCustomer = customers[Math.floor(random() * customers.length)];
  let totalForTarget = 0;
  let countForTarget = 0;

  // Generate 150 transactions
  for (let i = 0; i < 150; i++) {
    const customerId = customers[Math.floor(random() * customers.length)];
    const year = 2024;
    const month = String(Math.floor(random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(random() * 28) + 1).padStart(2, '0');
    const transactionDate = `${year}-${month}-${day}`;
    const amount = Math.round((50 + random() * 450) * 100) / 100;
    const status = random() > 0.15 ? "completed" : "cancelled";
    
    rows.push([customerId, transactionDate, amount, status]);
    
    if (customerId === targetCustomer && status === "completed") {
      totalForTarget += amount;
      countForTarget++;
    }
  }

  const avgValue = countForTarget > 0 ? Math.round(totalForTarget / countForTarget * 100) / 100 : 0;

  const csvContent = rows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the average transaction value");
    
    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the value");

    const tolerance = 1; // $1 tolerance
    if (Math.abs(value - avgValue) > tolerance) {
      throw new Error(
        `Incorrect. Filter for customer ${targetCustomer} with status 'completed', then calculate AVG(amount).`
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>RetailMetrics: Customer Lifetime Value Analysis</h2>
      <p>
        <strong>RetailMetrics Inc</strong> analyzes customer transaction patterns to calculate customer lifetime value.
        Use SQL to query the transaction database and calculate average transaction values.
      </p>

      <h3>Business Context</h3>
      <p>
        The marketing team needs to identify high-value customers to target for loyalty programs.
        They want to analyze completed transactions only (excluding cancelled orders).
      </p>

      <h3>Database Schema</h3>
      <ul>
        <li><code>customer_id</code>: Unique customer identifier (C001, C002, etc.)</li>
        <li><code>transaction_date</code>: Date of transaction (YYYY-MM-DD)</li>
        <li><code>amount</code>: Transaction amount in USD</li>
        <li><code>status</code>: Transaction status (completed or cancelled)</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Download the CSV and load it into SQLite, DuckDB, or any SQL database</li>
        <li>Write a SQL query to calculate the average transaction amount for customer <strong>${targetCustomer}</strong></li>
        <li>Filter to include only <strong>completed</strong> transactions (exclude cancelled)</li>
        <li>Submit the average amount (rounded to 2 decimal places)</li>
      </ol>

      <p>
        Download the transaction data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <h3>Example SQL Query</h3>
      <pre><code>SELECT AVG(amount) as avg_value
FROM transactions
WHERE customer_id = '${targetCustomer}'
  AND status = 'completed';</code></pre>

      <h3>Tools You Can Use</h3>
      <ul>
        <li><strong>SQLite:</strong> <code>sqlite3 transactions.db</code> + <code>.import</code></li>
        <li><strong>DuckDB:</strong> <code>SELECT AVG(amount) FROM read_csv('${id}.csv') WHERE ...</code></li>
        <li><strong>Python Pandas:</strong> <code>df.query("customer_id == '${targetCustomer}' & status == 'completed'")</code></li>
        <li><strong>Excel:</strong> Use AVERAGEIFS function (though SQL is preferred)</li>
      </ul>

      <label for="${id}" class="form-label">
        What is the average completed transaction amount for customer ${targetCustomer}?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="e.g., 234.56" 
        required 
      />
      <p class="text-muted">
        Submit the average amount as a number with 2 decimal places (e.g., 234.56)
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}