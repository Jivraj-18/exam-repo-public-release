import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-complex-aggregation";
  const title = "Multi-Level Sales Aggregation & Filtering";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const regions = ["North", "South", "East", "West"];
  const products = ["Widget", "Gadget", "Doodad"];
  
  // Generate 200 transaction records
  const transactions = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    region: pick(regions),
    product: pick(products),
    qty: randInt(1, 100),
    unit_price: Number((10 + random() * 90).toFixed(2)),
    discount: Number((random() * 0.3).toFixed(2)) // 0.00 to 0.30
  }));

  // Logic: 
  // 1. Group by Region, then Product.
  // 2. Calc Net Revenue per row: qty * unit_price * (1 - discount).
  // 3. Sum Net Revenue per group.
  // 4. Filter groups with Total Revenue < 3000.
  // 5. Sort by Region (A-Z), then Total Revenue (Desc).

  const grouped = {};
  transactions.forEach(t => {
    const key = `${t.region}|${t.product}`;
    if (!grouped[key]) grouped[key] = { region: t.region, product: t.product, revenue: 0 };
    grouped[key].revenue += t.qty * t.unit_price * (1 - t.discount);
  });

  const expected = Object.values(grouped)
    .map(g => ({ ...g, revenue: Number(g.revenue.toFixed(2)) }))
    .filter(g => g.revenue >= 3000)
    .sort((a, b) => a.region.localeCompare(b.region) || b.revenue - a.revenue);

  const answer = (input) => {
    try {
      const arr = JSON.parse(input);
      if (arr.length !== expected.length) throw new Error(`Length mismatch: Expected ${expected.length}, got ${arr.length}`);
      return arr.every((item, i) => 
        item.region === expected[i].region && 
        item.product === expected[i].product && 
        Math.abs(item.revenue - expected[i].revenue) < 0.1
      );
    } catch (e) {
      throw new Error("Invalid JSON or logic: " + e.message);
    }
  };

  const question = html`
    <div class="mb-3">
      <p>
        Perform a revenue analysis on the <strong>200</strong> transactions provided in the JSON below.
      </p>
      <ol>
        <li>Calculate <strong>Net Revenue</strong> for each transaction: <code>qty * unit_price * (1 - discount)</code>.</li>
        <li>Group the data by <code>region</code> and <code>product</code>.</li>
        <li>Sum the Net Revenue for each group.</li>
        <li><strong>Filter</strong>: Keep only groups where Total Net Revenue is <strong>&ge; 3000.00</strong>.</li>
        <li><strong>Sort</strong>: By <code>region</code> (A-Z), then by <code>revenue</code> (Descending).</li>
        <li>Return a JSON array of objects with keys: <code>region</code>, <code>product</code>, <code>revenue</code> (rounded to 2 decimal places).</li>
      </ol>
      <details>
        <summary>View Source Data (JSON)</summary>
        <pre style="white-space: pre-wrap; max-height: 200px; overflow: auto;"><code class="language-json">${JSON.stringify(transactions, null, 2)}</code></pre>
      </details>
      <label for="${id}" class="form-label">Result JSON:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='[{"region":"East","product":"Widget","revenue":4500.50}, ...]' />
    </div>
  `;

  return { id, title, weight, question, answer };
}