import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 0.75 }) {
  const id = "q-regional-performance-comparison";
  const title = "Python: Regional Performance Comparison & Ranking";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
  const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"];
  const rows = [["region", "quarter", "revenue_usd", "profit_margin_pct", "customer_satisfaction", "market_share_pct"]];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  // Regional performance profiles
  const regionProfiles = {
    "North America": { revBase: 2500000, profitBase: 18, satisfactionBase: 8.2, marketBase: 0.35 },
    "Europe": { revBase: 2200000, profitBase: 16, satisfactionBase: 7.9, marketBase: 0.28 },
    "Asia Pacific": { revBase: 1800000, profitBase: 15, satisfactionBase: 7.6, marketBase: 0.22 },
    "Latin America": { revBase: 1200000, profitBase: 14, satisfactionBase: 7.4, marketBase: 0.10 },
    "Middle East": { revBase: 800000, profitBase: 17, satisfactionBase: 8.0, marketBase: 0.05 },
  };

  const totalRevenue = {};
  for (const region of regions) {
    totalRevenue[region] = 0;
  }

  for (const region of regions) {
    const profile = regionProfiles[region];

    for (const quarter of quarters) {
      const qIndex = quarters.indexOf(quarter);

      // Growth trajectory
      const growth = Math.pow(1 + 0.08, qIndex); // 8% quarterly growth

      // Generate with variance
      const revVariance = randomNormal() * 0.12 + 1;
      const revenue = Math.round(profile.revBase * growth * revVariance);
      totalRevenue[region] += revenue;

      const profitVariance = randomNormal() * 1.5;
      const profitMargin = Math.max(8, Math.min(25, profile.profitBase + profitVariance + qIndex * 0.3));

      const satisfactionVariance = randomNormal() * 0.4;
      const satisfaction = Math.max(6.5, Math.min(9.5, profile.satisfactionBase + satisfactionVariance));

      const marketVariance = randomNormal() * 0.02;
      const marketShare = Math.max(0.01, profile.marketBase * growth + marketVariance);

      rows.push([
        region,
        quarter,
        revenue,
        profitMargin.toFixed(1),
        satisfaction.toFixed(1),
        (marketShare * 100).toFixed(2),
      ]);
    }
  }

  // Find top region by total revenue
  let topRegion = "";
  let topRevenue = 0;
  for (const [region, rev] of Object.entries(totalRevenue)) {
    if (rev > topRevenue) {
      topRevenue = rev;
      topRegion = region;
    }
  }

  const csvContent = rows
    .map((row) => {
      if (typeof row[2] === "number") {
        return [row[0], row[1], row[2], row[3], row[4], row[5]].join(",");
      }
      return row.join(",");
    })
    .join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the region with the highest total revenue.");
    const input = response.trim();

    if (input !== topRegion) {
      throw new Error(
        `Recalculate total regional revenue. Use groupby('region')['revenue_usd'].sum() and identify the maximum. The top region is ${topRegion} with $${topRevenue.toLocaleString()} total revenue.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>GlobalCorp: Regional Financial Performance Analysis</h2>
      <p>
        GlobalCorp operates in five regions and wants to identify the strongest performer for strategic resource
        allocation. Analyze four quarters of financial data using Pandas to rank regions by total revenue.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>region</code>: Five geographic markets (North America, Europe, Asia Pacific, Latin America, Middle East)</li>
        <li><code>quarter</code>: Reporting quarter (Q1–Q4 2024)</li>
        <li><code>revenue_usd</code>: Total quarterly revenue</li>
        <li><code>profit_margin_pct</code>: Percentage profit margin</li>
        <li><code>customer_satisfaction</code>: Net satisfaction score (0–10)</li>
        <li><code>market_share_pct</code>: Regional market share percentage</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Load the CSV into Pandas.</li>
        <li>Group by <code>region</code> and sum <code>revenue_usd</code> across all four quarters.</li>
        <li>Identify the region with the highest total revenue.</li>
        <li>Return the region name (e.g., "North America").</li>
      </ol>

      <p>
        Download the quarterly regional performance data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Which region generated the highest total revenue across all four quarters?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. North America" required />
      <p class="text-muted">
        Use <code>df.groupby('region')['revenue_usd'].sum()</code> to aggregate and <code>.idxmax()</code> to find the top region.
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

df = pd.read_csv("q-regional-performance-comparison.csv")
regional_revenue = df.groupby("region")["revenue_usd"].sum()
top_region = regional_revenue.idxmax()
print(f"Top region: {top_region}")
print(f"Total revenue: ${regional_revenue[top_region]:,.0f}")
print(regional_revenue.sort_values(ascending=False))

*/
