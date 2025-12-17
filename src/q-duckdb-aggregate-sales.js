import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-aggregate-sales";
  const title = "DuckDB: Sales Data Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate sample sales data
  const regions = ["North", "South", "East", "West", "Central"];
  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard", "Mouse", "Headphones", "Speaker"];
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const numRecords = 80 + Math.floor(random() * 40);
  const salesData = [];

  for (let i = 0; i < numRecords; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const quarter = quarters[Math.floor(random() * quarters.length)];
    const quantity = 10 + Math.floor(random() * 90);
    const unit_price = Math.floor(100 + random() * 900);
    const total = quantity * unit_price;

    salesData.push({ region, product, quarter, quantity, unit_price, total });
  }

  // Pick a random region and quarter to ask about
  const targetRegion = regions[Math.floor(random() * regions.length)];
  const targetQuarter = quarters[Math.floor(random() * quarters.length)];

  // Calculate expected answer
  const expectedTotal = salesData
    .filter((s) => s.region === targetRegion && s.quarter === targetQuarter)
    .reduce((sum, s) => sum + s.total, 0);

  // Generate CSV content
  const csvHeader = "region,product,quarter,quantity,unit_price,total";
  const csvRows = salesData.map((s) => `${s.region},${s.product},${s.quarter},${s.quantity},${s.unit_price},${s.total}`);
  const csvContent = [csvHeader, ...csvRows].join("\n");

  const question = html`
    <div class="mb-3">
      <h4>DuckDB: Sales Data Analysis</h4>
      <p>You are analyzing quarterly sales data for a retail company. Below is a CSV dataset of sales transactions:</p>

      <pre
        style="max-height: 250px; overflow-y: auto; background: #f5f5f5; padding: 10px; font-size: 11px;"
      ><code>${csvContent}</code></pre>

      <p>
        <strong>Task:</strong> Using DuckDB, write a SQL query to find the
        <strong>total sales amount</strong> (sum of the <code>total</code> column) for region
        <strong>"${targetRegion}"</strong> in quarter <strong>"${targetQuarter}"</strong>.
      </p>

      <p><strong>Hint:</strong> You can load the CSV directly in DuckDB using:</p>
      <pre><code>SELECT * FROM read_csv_auto('sales.csv');</code></pre>
      <p>Then filter by region and quarter, and use <code>SUM(total)</code></p>

      <label for="${id}" class="form-label">
        What is the total sales amount for region "${targetRegion}" in "${targetQuarter}"?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
      <p class="text-muted">Enter the numeric value (e.g., <code>125000</code>)</p>
    </div>
  `;

  const answer = (input) => {
    if (!input || input.trim() === "") throw new Error("Answer is required");

    const userAnswer = parseInt(input, 10);
    if (isNaN(userAnswer)) throw new Error("Please enter a valid number");

    if (userAnswer !== expectedTotal) {
      throw new Error(`Incorrect. Expected total is ${expectedTotal}`);
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
