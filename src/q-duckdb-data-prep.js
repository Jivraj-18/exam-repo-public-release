import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-data-prep";
  const title = "Data Preparation with DuckDB";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // Sample data
  const products = ["Laptop", "Phone", "Book", "Headphones", "Keyboard"];
  const regions = ["North", "South", "East", "West"];
  const salesData = Array.from({ length: 15 }, () => ({
    product: pick(products),
    region: pick(regions),
    units_sold: Math.floor(random() * 50) + 1,
    unit_price: Number((100 + random() * 400).toFixed(2)),
  }));

  // Expected result: total sales per region (units_sold * unit_price)
  const expected = {};
  for (const row of salesData) {
    expected[row.region] = Number(
      ((expected[row.region] || 0) + row.units_sold * row.unit_price).toFixed(2)
    );
  }

  const answer = (input) => {
    const parsed = JSON.parse(input);
    return Object.keys(expected).every(
      (region) => parsed[region] !== undefined && Number(parsed[region].toFixed(2)) === expected[region]
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are working with <strong>DuckDB</strong> to prepare sales data.
        You have a dataset of product sales by region.
      </p>

      <p>
        <strong>Task:</strong> Using DuckDB, compute the <strong>total sales per region</strong>.
      </p>

      <ul>
        <li>Total sales = <code>units_sold × unit_price</code></li>
        <li>Group by <code>region</code></li>
        <li>Round totals to 2 decimal places</li>
      </ul>

      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(salesData, null, 2)}
      </code></pre>

      <label for="${id}" class="form-label">
        Enter a JSON object mapping region → total sales
      </label>

      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        Example format: <code>{"North": 12345.67, "South": 9876.54}</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
