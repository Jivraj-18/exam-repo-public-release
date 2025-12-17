import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 2 }) {
  const id = "q-duckdb-sales-analysis";
  const title = "DuckDB: Advanced Time-Series Analysis with Window Functions";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North", "South", "East", "West", "Central"];
  const products = ["Widget-A", "Widget-B", "Gadget-X", "Gadget-Y", "Gizmo-Pro"];
  const categories = ["Electronics", "Furniture", "Clothing"];

  // Generate CSV data with time series pattern
  const records = [];
  const lines = ["order_id,region,product,category,amount,quantity,order_date,customer_id"];

  const startDate = new Date("2024-01-01");

  const randomInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const randomFloat = (min, max) => Math.round((min + random() * (max - min)) * 100) / 100;

  // Generate 1000 orders across the year
  for (let i = 1; i <= 1000; i++) {
    const region = pick(regions, random);
    const product = pick(products, random);
    const category = pick(categories, random);
    const quantity = randomInt(1, 10);
    const amount = randomFloat(50, 500);
    const dayOffset = randomInt(0, 364);
    const orderDate = new Date(startDate);
    orderDate.setDate(startDate.getDate() + dayOffset);
    const dateStr = orderDate.toISOString().split("T")[0];
    const customerId = `C${randomInt(1, 100).toString().padStart(3, "0")}`;

    records.push({
      order_id: i,
      region,
      product,
      category,
      amount,
      quantity,
      order_date: dateStr,
      customer_id: customerId,
    });

    lines.push(`${i},${region},${product},${category},${amount},${quantity},${dateStr},${customerId}`);
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });

  // Pick a specific month for analysis
  const targetMonth = randomInt(3, 10); // March to October
  const targetMonthStr = `2024-${targetMonth.toString().padStart(2, "0")}`;
  const targetCategory = pick(categories, random);

  // Calculate expected answer using complex window functions
  const monthRecords = records.filter(
    (r) => r.order_date.startsWith(targetMonthStr) && r.category === targetCategory,
  );

  // Calculate cumulative sales and running average per region
  const regionData = {};
  for (const region of regions) {
    const regionOrders = monthRecords.filter((r) => r.region === region).sort((a, b) =>
      a.order_date.localeCompare(b.order_date),
    );

    if (regionOrders.length > 0) {
      let cumSum = 0;
      let maxCumulative = 0;

      for (const order of regionOrders) {
        cumSum += order.amount;
        if (cumSum > maxCumulative) {
          maxCumulative = cumSum;
        }
      }

      regionData[region] = {
        totalOrders: regionOrders.length,
        maxCumulative: maxCumulative,
      };
    }
  }

  // Find region with highest max cumulative sales
  let topRegion = "";
  let maxValue = 0;
  for (const [region, data] of Object.entries(regionData)) {
    if (data.maxCumulative > maxValue) {
      maxValue = data.maxCumulative;
      topRegion = region;
    }
  }

  const question = html`
    <div class="mb-3">
      <h2>Advanced Time-Series Analysis with DuckDB Window Functions</h2>
      <p>
        Real-world data analysis often requires sophisticated SQL techniques like window functions, CTEs, and temporal
        analysis. This question tests your ability to perform complex analytical queries.
      </p>
      <p>
        Download the sales data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <h3>Complex Analysis Task</h3>
      <p>
        Using DuckDB, perform a sophisticated time-series analysis to answer this question:
      </p>
      <p class="alert alert-info">
        <strong>Question:</strong> For <strong>${targetCategory}</strong> category in
        <strong>${targetMonthStr}</strong> (month ${targetMonth} of 2024), which region had the
        <strong>highest maximum cumulative sales</strong> when orders are processed chronologically by date?
      </p>
      <h3>What is "Maximum Cumulative Sales"?</h3>
      <p>
        For each region, calculate cumulative sales day-by-day throughout the month. The "maximum cumulative sales" is
        the highest point this cumulative total reaches during the month.
      </p>
      <h3>Required SQL Technique</h3>
      <p>You must use window functions to solve this. Here's the approach:</p>
      <pre><code class="language-sql">-- Solution template
WITH daily_sales AS (
  SELECT
    region,
    order_date,
    amount,
    -- Calculate cumulative sum ordered by date within each region
    SUM(amount) OVER (
      PARTITION BY region
      ORDER BY order_date
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) as cumulative_sales
  FROM read_csv_auto('${id}.csv')
  WHERE
    STRFTIME(order_date, '%Y-%m') = '${targetMonthStr}'
    AND category = '${targetCategory}'
  ORDER BY region, order_date
),
max_cumulative AS (
  SELECT
    region,
    MAX(cumulative_sales) as max_cumulative_sales
  FROM daily_sales
  GROUP BY region
)
SELECT region, max_cumulative_sales
FROM max_cumulative
ORDER BY max_cumulative_sales DESC
LIMIT 1;</code></pre>
      <h3>Key Concepts Required</h3>
      <ul>
        <li><strong>Window Functions:</strong> SUM() OVER (PARTITION BY ... ORDER BY ...)</li>
        <li><strong>CTEs (Common Table Expressions):</strong> WITH clause for multi-step queries</li>
        <li><strong>Date Filtering:</strong> STRFTIME() for month extraction</li>
        <li><strong>Aggregation:</strong> MAX() to find peak cumulative value per region</li>
      </ul>
      <label for="${id}" class="form-label">
        Which region had the highest maximum cumulative sales for ${targetCategory} in ${targetMonthStr}?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Enter the exact region name (case-sensitive): North, South, East, West, or Central</p>
    </div>
  `;

  const answer = async (value) => {
    const region = String(value || "").trim();

    if (!region) {
      throw new Error("Please enter a region name");
    }

    if (!regions.includes(region)) {
      throw new Error(`Invalid region. Must be one of: ${regions.join(", ")}`);
    }

    if (region !== topRegion) {
      throw new Error(
        `Incorrect. Please verify your window function query for ${targetCategory} in ${targetMonthStr}. ` +
          `Make sure you're calculating cumulative sales correctly using SUM() OVER (PARTITION BY region ORDER BY order_date).`,
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
