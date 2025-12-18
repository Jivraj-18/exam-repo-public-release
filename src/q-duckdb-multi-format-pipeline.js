import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 2 }) {
  const id = "q-duckdb-multi-format-pipeline";
  const title = "DuckDB: Multi-Format Data Pipeline";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate sales data with multiple formats: CSV, JSON, Parquet concepts
  const regions = ["North", "South", "East", "West"];
  const products = ["Widget-A", "Gadget-B", "Tool-C", "Device-D"];
  const channels = ["online", "retail", "wholesale"];

  const targetRegion = regions[Math.floor(random() * regions.length)];
  const targetProduct = products[Math.floor(random() * products.length)];
  const threshold = 5000 + Math.floor(random() * 5000);

  // Generate CSV data with messy formatting
  const csvLines = ["date,region,product,channel,revenue,quantity,discount_pct,notes"];
  let totalQualified = 0;
  let sumRevenue = 0;

  for (let i = 0; i < 500; i++) {
    const date = new Date(2024, Math.floor(random() * 12), Math.floor(random() * 28) + 1);
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const channel = channels[Math.floor(random() * channels.length)];
    const revenue = Math.round((1000 + random() * 9000) * 100) / 100;
    const quantity = Math.floor(random() * 50) + 1;
    const discount = Math.round(random() * 30 * 10) / 10;
    const notes = random() > 0.8 ? "PROMO_ACTIVE" : "";

    csvLines.push(
      `${date.toISOString().split("T")[0]},${region},${product},${channel},${revenue},${quantity},${discount},"${notes}"`,
    );

    // Calculate answer
    if (region === targetRegion && product === targetProduct && revenue > threshold) {
      totalQualified++;
      sumRevenue += revenue;
    }
  }

  const avgRevenue = totalQualified > 0 ? sumRevenue / totalQualified : 0;
  const csvBlob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    const parsed = parseFloat(String(value).replace(/[^0-9.-]/g, ""));
    if (isNaN(parsed)) throw new Error("Enter a valid average revenue.");
    if (Math.abs(parsed - avgRevenue) > 1) {
      throw new Error(`Incorrect average. Ensure you filtered for region='${targetRegion}', product='${targetProduct}', and revenue > ${threshold}.`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>DataFlow Analytics: Multi-Source Revenue Analysis</h2>
      <p>
        <strong>DataFlow Analytics</strong> is a business intelligence consultancy that helps enterprises consolidate data
        from multiple sources for advanced analytics. Their client, a global retail chain, stores sales transactions in
        various formats across different systems, making unified analysis challenging.
      </p>

      <h3>Business Challenge</h3>
      <p>
        The retail client needs to identify high-performing products in specific regions to optimize inventory and
        marketing spend. Traditional tools struggle with the data volume and format diversity. The data team needs a
        powerful SQL-based solution that can efficiently process millions of rows without loading everything into memory.
      </p>

      <h3>Technical Context</h3>
      <p>
        <strong>DuckDB</strong> is an embedded analytical database optimized for OLAP workloads. Unlike traditional
        databases, it can directly query CSV, JSON, and Parquet files without import, making it ideal for ad-hoc analysis
        on heterogeneous data sources. It supports complex SQL operations including window functions, pivots, and regex.
      </p>

      <h3>Your Task</h3>
      <p>
        Using <strong>DuckDB</strong>, analyze the provided sales transactions CSV to compute the average revenue for
        high-value transactions meeting specific criteria.
      </p>

      <h3>Requirements</h3>
      <ol>
        <li>Install DuckDB (<code>pip install duckdb</code> or use DuckDB CLI)</li>
        <li>Load the CSV file into DuckDB</li>
        <li>
          Filter transactions where:
          <ul>
            <li><code>region = '${targetRegion}'</code></li>
            <li><code>product = '${targetProduct}'</code></li>
            <li><code>revenue > ${threshold}</code></li>
          </ul>
        </li>
        <li>Calculate the average revenue for these filtered transactions</li>
        <li>Round to 2 decimal places</li>
      </ol>

      <h3>DuckDB Example</h3>
      <pre><code>import duckdb
con = duckdb.connect()
result = con.execute("""
  SELECT AVG(revenue) as avg_revenue
  FROM read_csv_auto('sales.csv')
  WHERE region = 'North' AND product = 'Widget-A' AND revenue > 8000
""").fetchone()
print(result[0])</code></pre>

      <p>
        Download the sales data:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(csvBlob, `${id}.csv`)}
        >
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the average revenue for ${targetProduct} in ${targetRegion} region where revenue exceeds ${threshold}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 7234.56" required />
      <p class="text-muted">Use DuckDB to query the CSV file directly. Round to 2 decimal places.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
