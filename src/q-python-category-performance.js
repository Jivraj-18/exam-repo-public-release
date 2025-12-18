import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.0 }) {
  const id = "q-python-category-performance";
  const title = "Python: Product Category Performance Ranking";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["Electronics", "Furniture", "Apparel", "Home & Garden", "Sports"];
  const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"];
  const rows = [["month", "category", "units_sold", "revenue_usd", "returns", "customer_count"]];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  // Performance baseline for each category
  const categoryMetrics = {
    Electronics: { unitBase: 240, priceBase: 450, returnRate: 0.08, growthRate: 0.03 },
    Furniture: { unitBase: 150, priceBase: 280, returnRate: 0.05, growthRate: 0.02 },
    "Apparel": { unitBase: 380, priceBase: 65, returnRate: 0.15, growthRate: 0.04 },
    "Home & Garden": { unitBase: 200, priceBase: 95, returnRate: 0.06, growthRate: 0.025 },
    Sports: { unitBase: 190, priceBase: 140, returnRate: 0.07, growthRate: 0.035 },
  };

  let topCategory = "";
  let topRevenue = 0;

  for (const month of months) {
    const monthIndex = months.indexOf(month);

    for (const category of categories) {
      const metrics = categoryMetrics[category];

      // Growth over time
      const growth = Math.pow(1 + metrics.growthRate, monthIndex);

      // Generate realistic variance
      const unitNoise = randomNormal() * 0.08 + 1;
      const priceNoise = randomNormal() * 0.05 + 1;

      const unitsSold = Math.max(10, Math.round(metrics.unitBase * growth * unitNoise));
      const avgPrice = Math.max(15, metrics.priceBase * priceNoise);
      const revenue = Math.round(unitsSold * avgPrice * 100) / 100;
      const returnedUnits = Math.max(0, Math.round(unitsSold * metrics.returnRate * (1 + randomNormal() * 0.2)));
      const customerCount = Math.max(5, Math.round(unitsSold / (2 + random() * 3)));

      rows.push([month, category, unitsSold, revenue, returnedUnits, customerCount]);

      // Track overall revenue for top category
      if (monthIndex === months.length - 1 && revenue > topRevenue) {
        topRevenue = revenue;
        topCategory = category;
      }
    }
  }

  // Calculate total revenue by category
  const categoryRevenue = {};
  for (const category of categories) {
    categoryRevenue[category] = rows
      .filter((row) => row[1] === category && row[1] !== "category")
      .reduce((sum, row) => sum + row[3], 0);
  }

  const bestCategory = Object.keys(categoryRevenue).reduce((a, b) =>
    categoryRevenue[a] > categoryRevenue[b] ? a : b,
  );

  const csvContent = rows.map((row) => {
    if (typeof row[3] === "number") {
      return [row[0], row[1], row[2], row[3].toFixed(2), row[4], row[5]].join(",");
    }
    return row.join(",");
  }).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the category with highest total revenue.");
    const input = response.trim();

    if (input !== bestCategory) {
      throw new Error(
        `Recalculate total revenue by category. Use groupby('category') and sum('revenue_usd'). The category with the highest total is ${bestCategory}, not ${input}.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>RetailHub: Six-Month Category Performance Analysis</h2>
      <p>
        RetailHub operates across five product categories and wants to optimize SKU allocation for the next quarter.
        Use Pandas to analyze 6 months of sales data and identify the strongest performing category by total revenue.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>month</code>: YYYY-MM reporting period</li>
        <li><code>category</code>: Product category (Electronics, Furniture, Apparel, Home & Garden, Sports)</li>
        <li><code>units_sold</code>: Number of units transacted</li>
        <li><code>revenue_usd</code>: Total revenue for the category-month</li>
        <li><code>returns</code>: Units returned in the period</li>
        <li><code>customer_count</code>: Unique customers in the category-month</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Load the CSV into Pandas.</li>
        <li>Group by <code>category</code> and sum the <code>revenue_usd</code> across all 6 months.</li>
        <li>Identify the category with the highest total revenue.</li>
        <li>Return the category name (e.g., "Electronics").</li>
      </ol>

      <p>
        Download the 6-month sales dataset:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Which product category generated the highest total revenue across all 6 months?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. Electronics" required />
      <p class="text-muted">
        Use <code>df.groupby('category')['revenue_usd'].sum()</code> to aggregate revenue and find the max.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended Python workflow (run with uv):

# /// script
# requires-python = ">=3.12"
# dependencies = ["pandas"]
# ///
import pandas as pd

df = pd.read_csv("q-python-category-performance.csv")
revenue_by_category = df.groupby("category")["revenue_usd"].sum()
top_category = revenue_by_category.idxmax()
print(f"Top category: {top_category}")
print(revenue_by_category.sort_values(ascending=False))

*/
