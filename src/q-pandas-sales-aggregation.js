import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-pandas-sales-aggregation";
  const title = "Pandas: Sales Data Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North", "South", "East", "West"];
  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard"];
  const months = ["2024-01", "2024-02", "2024-03"];

  const rows = [["region", "product", "month", "quantity", "unit_price"]];

  let totalRevenueTarget = 0;
  const targetRegion = regions[Math.floor(random() * regions.length)];
  const targetProduct = products[Math.floor(random() * products.length)];

  // Generate 150 sales records
  for (let i = 0; i < 150; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const month = months[Math.floor(random() * months.length)];
    const quantity = Math.floor(random() * 50) + 10;
    const basePrice = { Laptop: 1200, Phone: 800, Tablet: 600, Monitor: 400, Keyboard: 100 };
    const unitPrice = basePrice[product] + Math.floor(random() * 200) - 100;

    rows.push([region, product, month, quantity, unitPrice]);

    // Calculate target revenue
    if (region === targetRegion && product === targetProduct) {
      totalRevenueTarget += quantity * unitPrice;
    }
  }

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the total revenue.");
    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the revenue value.");

    const tolerance = 1;
    if (Math.abs(value - totalRevenueTarget) > tolerance) {
      throw new Error(
        `Revenue calculation is incorrect. Filter for region='${targetRegion}' and product='${targetProduct}', then sum (quantity × unit_price).`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Sales Revenue Analysis</h2>
      <p>
        You work as a data analyst for an electronics retailer. The company wants to know the total revenue generated
        from a specific <strong>region-product</strong> combination to evaluate market performance.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>region</code>: Sales region (North, South, East, West)</li>
        <li><code>product</code>: Product name</li>
        <li><code>month</code>: Month of sale (YYYY-MM)</li>
        <li><code>quantity</code>: Units sold</li>
        <li><code>unit_price</code>: Price per unit</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load the CSV into Pandas.</li>
        <li>Filter for <code>region='${targetRegion}'</code> and <code>product='${targetProduct}'</code>.</li>
        <li>Calculate revenue as <code>quantity × unit_price</code> for each row.</li>
        <li>Sum the total revenue and enter it below (round to nearest integer).</li>
      </ol>

      <p>
        Download the sales data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the total revenue for ${targetProduct} in the ${targetRegion} region?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 245680" required />
      <p class="text-muted">Use Pandas <code>query()</code> or boolean indexing, then calculate the revenue sum.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended Python workflow:

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd

df = pd.read_csv("q-pandas-sales-aggregation.csv")
df['revenue'] = df['quantity'] * df['unit_price']
total = df.query("region == 'TARGET_REGION' and product == 'TARGET_PRODUCT'")['revenue'].sum()
print(int(total))

*/
