import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 2.0 }) {
  const id = "q-duckdb-sales-analysis";
  const title = "DuckDB: Complex Sales Cohort & Retention Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate complex sales data
  const regions = ["North", "South", "East", "West", "Central"];
  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard", "Server", "License"];
  const quarters = ["2023-Q1", "2023-Q2", "2023-Q3", "2023-Q4", "2024-Q1", "2024-Q2"];
  
  const salesData = [];
  let recordId = 1;
  
  // Generate 500+ records
  for (let i = 0; i < 500; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const quarter = quarters[Math.floor(random() * quarters.length)];
    const quantity = Math.floor(random() * 50) + 1;
    const pricePerUnit = Math.floor(random() * 1000) + 100;
    const discount = Math.floor(random() * 20) / 100; // 0-20% discount
    const revenue = quantity * pricePerUnit * (1 - discount);
    
    salesData.push({
      id: recordId++,
      region,
      product,
      quarter,
      quantity,
      price_per_unit: pricePerUnit,
      discount,
      revenue: Number(revenue.toFixed(2))
    });
  }
  
  // Calculate expected answer: 
  // Identify regions where the Quarter-over-Quarter (QoQ) growth rate for "Phone" sales 
  // was positive for at least 2 consecutive quarters in 2023.
  
  // Simplified logic for JS verification (simulating the SQL logic)
  const regionQuarterSales = {};
  salesData.filter(r => r.product === "Phone").forEach(r => {
    if (!regionQuarterSales[r.region]) regionQuarterSales[r.region] = {};
    regionQuarterSales[r.region][r.quarter] = (regionQuarterSales[r.region][r.quarter] || 0) + r.revenue;
  });

  const qualifyingRegions = [];
  for (const region of regions) {
    const q1 = regionQuarterSales[region]?.["2023-Q1"] || 0;
    const q2 = regionQuarterSales[region]?.["2023-Q2"] || 0;
    const q3 = regionQuarterSales[region]?.["2023-Q3"] || 0;
    const q4 = regionQuarterSales[region]?.["2023-Q4"] || 0;
    
    const growthQ2 = q1 > 0 ? (q2 - q1) / q1 : 0;
    const growthQ3 = q2 > 0 ? (q3 - q2) / q2 : 0;
    const growthQ4 = q3 > 0 ? (q4 - q3) / q3 : 0;
    
    if ((growthQ2 > 0 && growthQ3 > 0) || (growthQ3 > 0 && growthQ4 > 0)) {
      qualifyingRegions.push(region);
    }
  }
  
  qualifyingRegions.sort();
  const expectedAnswer = qualifyingRegions.join(",");

  const answer = (input) => {
    const regions = input.trim().split(",").map(r => r.trim()).filter(Boolean).sort();
    
    if (regions.length !== qualifyingRegions.length) {
      throw new Error(`Expected ${qualifyingRegions.length} regions, got ${regions.length}`);
    }
    
    return regions.every((r, i) => r === qualifyingRegions[i]);
  };

  const csvData = "id,region,product,quarter,quantity,price_per_unit,discount,revenue\n" +
    salesData.map(row => 
      `${row.id},${row.region},${row.product},${row.quarter},${row.quantity},${row.price_per_unit},${row.discount},${row.revenue}`
    ).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Case Study: Advanced Sales Trend Analysis</h2>
      <p>
        <strong>TechMart</strong> executives need a deep-dive analysis into regional performance stability. 
        Simple totals aren't enough; they want to identify regions showing <strong>sustained growth momentum</strong>.
      </p>
      
      <h3>Task</h3>
      <p>
        Using DuckDB, analyze the sales data to identify regions that achieved <strong>positive Quarter-over-Quarter (QoQ) revenue growth</strong> 
        for the "Phone" product category for <strong>at least two consecutive quarters</strong> within the year <strong>2023</strong>.
      </p>
      
      <p>Specifically:</p>
      <ol>
        <li>Filter sales for product "Phone".</li>
        <li>Aggregate revenue by Region and Quarter.</li>
        <li>Calculate QoQ growth: <code>(Current_Q_Revenue - Previous_Q_Revenue) / Previous_Q_Revenue</code>.</li>
        <li>Identify regions where growth was > 0 for (Q1→Q2 AND Q2→Q3) OR (Q2→Q3 AND Q3→Q4).</li>
        <li>Return the qualifying region names as a comma-separated list, sorted alphabetically.</li>
      </ol>
      
      <details>
        <summary><strong>Hint: Advanced SQL Concepts</strong></summary>
        <p>You will likely need:</p>
        <ul>
          <li><code>GROUP BY</code> and <code>SUM()</code></li>
          <li>Window Functions: <code>LAG(revenue) OVER (PARTITION BY region ORDER BY quarter)</code></li>
          <li>Common Table Expressions (CTEs) to structure the analysis steps</li>
        </ul>
      </details>
      
      <h3>Sales Data (Sample)</h3>
      <pre style="white-space: pre-wrap; max-height: 300px; overflow-y: auto;"><code class="language-csv">
${csvData}
      </code></pre>
      
      <label for="${id}" class="form-label">
        Enter qualifying regions (comma-separated, alphabetical):
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="e.g., East,North"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
