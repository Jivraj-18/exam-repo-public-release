import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-pandas-merge-analysis";
  const title = "Pandas DataFrame Merge and Analysis";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  // Generate sales data
  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard", "Mouse", "Headset"];
  const regions = ["North", "South", "East", "West"];
  
  const salesData = Array.from({ length: 50 }, (_, i) => ({
    sale_id: i + 1,
    product_id: randInt(101, 107),
    quantity: randInt(1, 10),
    region: pick(regions),
  }));

  // Generate product info
  const productInfo = [
    { product_id: 101, product_name: "Laptop", price: 1200 },
    { product_id: 102, product_name: "Phone", price: 800 },
    { product_id: 103, product_name: "Tablet", price: 500 },
    { product_id: 104, product_name: "Monitor", price: 300 },
    { product_id: 105, product_name: "Keyboard", price: 100 },
    { product_id: 106, product_name: "Mouse", price: 50 },
    { product_id: 107, product_name: "Headset", price: 150 },
  ];

  // Choose a specific region for filtering
  const targetRegion = pick(regions);
  
  // Calculate expected answer
  const merged = salesData.map(sale => {
    const product = productInfo.find(p => p.product_id === sale.product_id);
    return {
      ...sale,
      product_name: product.product_name,
      price: product.price,
      total_value: sale.quantity * product.price
    };
  });

  const filtered = merged.filter(row => row.region === targetRegion);
  const totalRevenue = filtered.reduce((sum, row) => sum + row.total_value, 0);

  const answer = (input) => {
    const value = parseFloat(input);
    if (isNaN(value)) throw new Error("Answer must be a number");
    if (Math.abs(value - totalRevenue) < 0.01) return true;
    throw new Error(`Expected ${totalRevenue}, got ${value}`);
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing sales data for a retail company. You have two datasets that need to be merged and analyzed.
      </p>
      <h5>Sales Data</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(salesData, null, 2)}
      </code></pre>
      <h5>Product Information</h5>
      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(productInfo, null, 2)}
      </code></pre>
      <h5>Task:</h5>
      <ol>
        <li>Merge the sales data with product information using <code>product_id</code> as the key</li>
        <li>Calculate the total value for each sale (quantity × price)</li>
        <li>Filter for sales in the <strong>${targetRegion}</strong> region only</li>
        <li>Calculate the total revenue from ${targetRegion} region sales</li>
      </ol>
      <p class="text-muted">
        Use Python pandas: <code>pd.merge()</code>, create a new column for total_value, filter by region, 
        and sum the total_value column.
      </p>
      <label for="${id}" class="form-label">Total revenue from ${targetRegion} region:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
