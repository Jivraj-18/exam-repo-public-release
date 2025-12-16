import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1.5 }) {
  const id = "q-duckdb-sales-analysis";
  const title = "DuckDB Sales Analytics";

  const random = seedrandom(`${user.email}#${id}`);

  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard", "Mouse"];
  const regions = ["North", "South", "East", "West"];

  const salesData = [];
  const csvLines = ["product,region,sales,quantity"];

  for (let i = 0; i < 200; i++) {
    const product = products[Math.floor(random() * products.length)];
    const region = regions[Math.floor(random() * regions.length)];
    const quantity = Math.floor(random() * 50) + 1;
    const price = Math.floor(random() * 1000) + 100;
    const sales = quantity * price;

    salesData.push({ product, region, sales, quantity });
    csvLines.push(`${product},${region},${sales},${quantity}`);
  }

  const csvContent = csvLines.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const selectedRegion = regions[Math.floor(random() * regions.length)];
  const topN = 3;

  const answer = (input) => {
    const regionData = salesData
      .filter((sale) => sale.region === selectedRegion)
      .reduce((acc, curr) => {
        if (!acc[curr.product]) {
          acc[curr.product] = { sales: 0, quantity: 0 };
        }
        acc[curr.product].sales += curr.sales;
        acc[curr.product].quantity += curr.quantity;
        return acc;
      }, {});

    const topProducts = Object.entries(regionData)
      .map(([product, data]) => ({ product, ...data }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, topN);

    const parsed = JSON.parse(input);

    if (parsed.length !== topN) {
      throw new Error(`Expected ${topN} products, got ${parsed.length}`);
    }

    for (let i = 0; i < topN; i++) {
      if (parsed[i].product !== topProducts[i].product) {
        throw new Error(`Product mismatch at rank ${i + 1}`);
      }
      if (Math.abs(parsed[i].total_sales - topProducts[i].sales) > 1) {
        throw new Error(`Sales mismatch for ${topProducts[i].product}`);
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>RetailPro: Regional Sales Performance</h2>
      <p>
        <strong>RetailPro</strong> manages inventory across multiple regions. They need fast SQL analytics on CSV sales
        data to identify top-performing products per region using DuckDB.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Download the sales CSV data</li>
        <li>Install DuckDB: <code>pip install duckdb</code></li>
        <li>
          Load CSV into DuckDB and run SQL query to:
          <ul>
            <li>Filter records for region = <strong>"${selectedRegion}"</strong></li>
            <li>Group by product and sum total sales</li>
            <li>Get top ${topN} products by sales (highest first)</li>
          </ul>
        </li>
        <li>Return JSON array: <code>[{"product": "...", "total_sales": ...}, ...]</code></li>
      </ol>

      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          Download Sales Data (${id}.csv)
        </button>
      </p>

      <p class="text-muted">
        Example DuckDB query: <code>SELECT product, SUM(sales) as total_sales FROM read_csv_auto('file.csv') WHERE
        region='${selectedRegion}' GROUP BY product ORDER BY total_sales DESC LIMIT ${topN}</code>
      </p>

      <label for="${id}" class="form-label">Paste JSON array of top ${topN} products:</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="6" required></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
