import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-duckdb-sales-analysis";
  const title = "DuckDB: SQL Aggregation with Multiple Filters";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["APAC", "EMEA", "Americas"];
  const categories = ["Electronics", "Furniture", "Office Supplies", "Technology"];
  const quarters = [
    { num: 1, months: [1, 2, 3], name: "Q1" },
    { num: 2, months: [4, 5, 6], name: "Q2" },
    { num: 3, months: [7, 8, 9], name: "Q3" },
    { num: 4, months: [10, 11, 12], name: "Q4" },
  ];

  // Randomly select target filters
  const targetRegion = regions[Math.floor(random() * regions.length)];
  const targetCategory = categories[Math.floor(random() * categories.length)];
  const targetQuarter = quarters[Math.floor(random() * quarters.length)];

  // Generate 30-40 rows of sales data
  const rowCount = 30 + Math.floor(random() * 11);
  const rows = [["date", "region", "product_category", "units", "revenue"]];

  let expectedRevenue = 0;

  for (let i = 0; i < rowCount; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const category = categories[Math.floor(random() * categories.length)];
    
    // Generate date - spread across all months of 2024
    const month = Math.floor(random() * 12) + 1;
    const day = Math.floor(random() * 28) + 1;
    const dateStr = `2024-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const units = Math.floor(random() * 50) + 1; // 1-50 units
    const pricePerUnit = 20 + random() * 180; // $20-$200 per unit
    const revenue = Math.round(units * pricePerUnit * 100) / 100;

    rows.push([dateStr, region, category, units, revenue.toFixed(2)]);

    // Calculate expected revenue for target filters
    if (region === targetRegion && category === targetCategory && targetQuarter.months.includes(month)) {
      expectedRevenue += revenue;
    }
  }

  expectedRevenue = Math.round(expectedRevenue * 100) / 100;

  // Generate CSV content
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = (userInput) => {
    const userValue = parseFloat(userInput);
    if (isNaN(userValue)) {
      throw new Error("Please enter a valid numeric value.");
    }
    if (Math.abs(userValue - expectedRevenue) > 0.50) {
      throw new Error(
        `Incorrect result. Ensure you filter by region='${targetRegion}', product_category='${targetCategory}', and dates in ${targetQuarter.name} 2024 (months ${targetQuarter.months.join(", ")}). Use SQL aggregation with WHERE clause filtering all three criteria, then SUM the revenue column.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Regional Sales Performance Analysis with DuckDB</h2>
      <p>
        <strong>GlobalTech Distributors</strong> is a multinational technology distribution company that tracks sales
        across multiple regions and product categories. The business intelligence team uses DuckDB for fast analytical
        queries on large sales datasets to identify high-performing product-region combinations.
      </p>
      <p>
        You have been provided with a sales dataset containing transaction records. Your task is to use SQL (with
        DuckDB, Python pandas, Excel, or any analysis tool) to calculate a specific revenue metric based on multiple
        filtering criteria.
      </p>

      <h3>Dataset Preview</h3>
      <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; margin-bottom: 10px;">
        <table class="table table-sm table-striped">
          <thead style="position: sticky; top: 0; background-color: white;">
            <tr>
              ${rows[0].map((header) => html`<th>${header}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.slice(1).map((row) => html`<tr>${row.map((cell) => html`<td>${cell}</td>`)}</tr>`)}
          </tbody>
        </table>
      </div>

      <p>
        Download the data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <h3>Your Task</h3>
      <p>Calculate the <strong>total revenue</strong> for transactions that meet <strong>all</strong> criteria:</p>
      <ul>
        <li>Region = <strong>${targetRegion}</strong></li>
        <li>Product Category = <strong>${targetCategory}</strong></li>
        <li>Date falls in <strong>${targetQuarter.name} 2024</strong> (months: ${targetQuarter.months.join(", ")})</li>
      </ul>

      <h3>Example DuckDB Query Approach</h3>
      <p>If using DuckDB, you might structure your query like this:</p>
      <pre style="background-color: #f5f5f5; padding: 10px; border: 1px solid #ddd;"><code>SELECT SUM(revenue) 
FROM read_csv_auto('${id}.csv')
WHERE region = 'YourRegion' 
  AND product_category = 'YourCategory'
  AND EXTRACT(MONTH FROM date::DATE) IN (month1, month2, month3);</code></pre>

      <p>
        <strong>Note:</strong> You can use any tool you prefer (DuckDB, Python pandas, Excel pivot tables, etc.) to
        analyze the data and calculate the result.
      </p>

      <label for="${id}" class="form-label">
        What is the total revenue? (Enter numeric value with up to 2 decimals)
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        required
        placeholder="e.g., 12345.67"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
