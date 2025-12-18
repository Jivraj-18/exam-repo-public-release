import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1.25 }) {
    const id = "q-pandas-aggregation";
    const title = "Pandas: Sales Data Aggregation";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    // Generate sales data
    const regions = ["North", "South", "East", "West"];
    const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard", "Mouse", "Headphones", "Webcam"];
    const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"];

    // Generate 80-120 sales records
    const numRecords = 80 + Math.floor(random() * 41);
    const sales = [];

    for (let i = 0; i < numRecords; i++) {
        sales.push({
            region: pick(regions),
            product: pick(products),
            month: pick(months),
            quantity: Math.floor(random() * 50) + 1,
            unit_price: Math.round((50 + random() * 450) * 100) / 100
        });
    }

    // Calculate total revenue for each sale
    sales.forEach(s => {
        s.revenue = Math.round(s.quantity * s.unit_price * 100) / 100;
    });

    // Create CSV
    const csvRows = [["region", "product", "month", "quantity", "unit_price", "revenue"]];
    sales.forEach(s => {
        csvRows.push([s.region, s.product, s.month, s.quantity, s.unit_price.toFixed(2), s.revenue.toFixed(2)]);
    });
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Find the region with highest total revenue
    const regionRevenue = {};
    sales.forEach(s => {
        regionRevenue[s.region] = (regionRevenue[s.region] || 0) + s.revenue;
    });

    let maxRegion = null;
    let maxRevenue = 0;
    for (const [region, revenue] of Object.entries(regionRevenue)) {
        if (revenue > maxRevenue) {
            maxRevenue = revenue;
            maxRegion = region;
        }
    }

    // Round to 2 decimal places
    maxRevenue = Math.round(maxRevenue * 100) / 100;

    const answer = (input) => {
        if (!input) throw new Error("Please provide an answer.");

        // Parse input - expect format like "North: 12345.67" or just "North 12345.67"
        const normalized = input.trim().toLowerCase();
        const regionMatch = regions.find(r => normalized.includes(r.toLowerCase()));
        const numberMatch = input.match(/[\d,]+\.?\d*/);

        if (!regionMatch) {
            throw new Error(`Region not found. Expected one of: ${regions.join(", ")}`);
        }
        if (!numberMatch) {
            throw new Error("Revenue amount not found. Include the total revenue value.");
        }

        const submittedRevenue = parseFloat(numberMatch[0].replace(/,/g, ''));

        if (regionMatch.toLowerCase() !== maxRegion.toLowerCase()) {
            throw new Error(`Incorrect region. Check your groupby aggregation.`);
        }

        // Allow 1% tolerance for floating point differences
        const tolerance = maxRevenue * 0.01;
        if (Math.abs(submittedRevenue - maxRevenue) > tolerance) {
            throw new Error(`Revenue is incorrect. Expected approximately ${maxRevenue.toFixed(2)}`);
        }

        return true;
    };

    const question = html`
    <div class="mb-3">
      <h2>RetailMax: Regional Sales Analysis</h2>
      <p>
        <strong>RetailMax</strong> is a retail analytics company. They want you to analyze their sales data
        using Python Pandas to identify the best-performing region.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>region</code>: Sales region (North, South, East, West)</li>
        <li><code>product</code>: Product name</li>
        <li><code>month</code>: Month of sale (YYYY-MM)</li>
        <li><code>quantity</code>: Units sold</li>
        <li><code>unit_price</code>: Price per unit in USD</li>
        <li><code>revenue</code>: Total revenue (quantity × unit_price)</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load the CSV file into a Pandas DataFrame.</li>
        <li>Group the data by <code>region</code>.</li>
        <li>Calculate the <strong>total revenue</strong> for each region.</li>
        <li>Find the region with the <strong>highest total revenue</strong>.</li>
      </ol>

      <h3>Hint</h3>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px;"><code class="language-python">df.groupby('region')['revenue'].sum()</code></pre>

      <p>
        Download the sales data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Which region has the highest total revenue? (Format: Region: Amount, e.g., "North: 12345.67")
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., North: 12345.67" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}

/* Solution

# /// script  
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd

df = pd.read_csv("q-pandas-aggregation.csv")

# Group by region and sum revenue
region_totals = df.groupby('region')['revenue'].sum()

# Find the region with max revenue
max_region = region_totals.idxmax()
max_revenue = region_totals.max()

print(f"{max_region}: {max_revenue:.2f}")

*/
