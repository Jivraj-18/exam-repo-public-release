import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-sql-query";
  const title = "DuckDB: SQL Query Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Generate product sales data
  const categories = ["Electronics", "Clothing", "Books", "Home", "Sports", "Toys"];
  const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata"];

  const numRecords = 150 + Math.floor(random() * 100); // 150-249 records
  const sales = [];

  for (let i = 1; i <= numRecords; i++) {
    const quantity = Math.floor(random() * 20) + 1;
    const price = Math.round((50 + random() * 450) * 100) / 100;
    sales.push({
      sale_id: i,
      category: pick(categories),
      city: pick(cities),
      quantity: quantity,
      unit_price: price,
      total: Math.round(quantity * price * 100) / 100
    });
  }

  // Create CSV
  const csvRows = [["sale_id", "category", "city", "quantity", "unit_price", "total"]];
  sales.forEach(s => {
    csvRows.push([s.sale_id, s.category, s.city, s.quantity, s.unit_price.toFixed(2), s.total.toFixed(2)]);
  });
  const csvContent = csvRows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  // Pick a random category to query
  const targetCategory = pick(categories);
  const minQuantity = 5 + Math.floor(random() * 10); // 5-14

  // Calculate expected answer: total sales for category where quantity >= minQuantity
  const filteredSales = sales.filter(s =>
    s.category === targetCategory && s.quantity >= minQuantity
  );
  const expectedTotal = Math.round(filteredSales.reduce((sum, s) => sum + s.total, 0) * 100) / 100;

  const answer = (input) => {
    if (!input) throw new Error("Please enter the total sales value.");

    const value = parseFloat(input.replace(/[^0-9.-]/g, ''));
    if (isNaN(value)) throw new Error("Please enter a valid number.");

    const tolerance = expectedTotal * 0.01;
    if (Math.abs(value - expectedTotal) > tolerance) {
      throw new Error(`Incorrect total. Use DuckDB to filter by category='${targetCategory}' AND quantity >= ${minQuantity}, then SUM the total column.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>RetailDB: DuckDB Sales Analysis</h2>
      <p>
        <strong>RetailDB Analytics</strong> uses DuckDB for fast in-process analytics.
        Your task is to write a SQL query to analyze sales data.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>sale_id</code>: Unique sale identifier</li>
        <li><code>category</code>: Product category</li>
        <li><code>city</code>: City of sale</li>
        <li><code>quantity</code>: Units sold</li>
        <li><code>unit_price</code>: Price per unit</li>
        <li><code>total</code>: Total sale value (quantity × unit_price)</li>
      </ul>

      <h3>Task</h3>
      <p>Using <strong>DuckDB</strong>, write a SQL query to find:</p>
      <ol>
        <li>Filter sales where <code>category = '${targetCategory}'</code></li>
        <li>AND <code>quantity >= ${minQuantity}</code></li>
        <li>Calculate the <strong>SUM of total</strong> for these filtered records</li>
      </ol>

      <h3>Example SQL</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-sql">SELECT SUM(total) 
FROM 'sales.csv' 
WHERE category = '...' AND quantity >= ...</code></pre>

      <h3>Hint: Run with DuckDB CLI or Python</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-python">import duckdb
result = duckdb.sql("SELECT SUM(total) FROM '${id}.csv' WHERE ...")
print(result.fetchone()[0])</code></pre>

      <p>
        Download the sales data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the total sales for ${targetCategory} with quantity >= ${minQuantity}?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution

# /// script
# requires-python = ">=3.12"
# dependencies = ["duckdb"]
# ///
import duckdb

# Replace with actual values from your question
category = "Electronics"  # Use the category shown in the question
min_quantity = 10  # Use the minimum quantity shown in the question

result = duckdb.sql(f"""
    SELECT SUM(total) as total_sales
    FROM 'q-duckdb-sql-query.csv'
    WHERE category = '{category}' AND quantity >= {min_quantity}
""")

print(result.fetchone()[0])

# Alternative: Using DuckDB CLI
# duckdb -c "SELECT SUM(total) FROM 'q-duckdb-sql-query.csv' WHERE category='Electronics' AND quantity >= 10"

*/
