import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { compareJSON } from "./utils/compare.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-csv-aggregate";
  const title = "Pandas CSV Data Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate personalized CSV data
  const rows = [];
  const categories = ["Electronics", "Clothing", "Food", "Books"];
  const numRows = Math.floor(random() * 3) + 4; // 4-6 rows

  for (let i = 0; i < numRows; i++) {
    const category = categories[Math.floor(random() * categories.length)];
    const quantity = Math.floor(random() * 50) + 10;
    const price = (random() * 100 + 10).toFixed(2);
    rows.push({ category, quantity: quantity.toString(), price });
  }

  // Calculate expected result
  const aggregated = {};
  rows.forEach((row) => {
    if (!aggregated[row.category]) {
      aggregated[row.category] = 0;
    }
    aggregated[row.category] += parseFloat(row.quantity) * parseFloat(row.price);
  });

  const expected = Object.entries(aggregated)
    .map(([category, total]) => ({
      category,
      total: parseFloat(total.toFixed(2)),
    }))
    .sort((a, b) => b.total - a.total);

  const csvContent = 
`category,quantity,price
${rows.map((r) => `${r.category},${r.quantity},${r.price}`).join("\n")}`;

  const answer = (json) => {
    const submitted = JSON.parse(json);
    
    // Normalize numbers to 2 decimal places for comparison
    const normalizedSubmitted = submitted.map(item => ({
      category: item.category,
      total: parseFloat(parseFloat(item.total).toFixed(2))
    }));

    compareJSON(expected, normalizedSubmitted, { verbose: true });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2><strong>Sales Analytics for RetailPro</strong></h2>
      <p>
        <strong>RetailPro</strong> is an e-commerce analytics platform that
        helps online retailers understand their sales patterns and optimize
        inventory management. The platform processes transaction data to provide
        insights into category performance and revenue distribution.
      </p>

      <h3>Dataset</h3>
      <p>You are provided with the following CSV data:</p>
      <pre><code>${csvContent}</code></pre>

      <h3>Your Task</h3>
      <p>
        Using pandas (or similar data processing), calculate the total revenue
        for each category by multiplying <code>quantity × price</code> and
        summing by category. Return the results as JSON, sorted by total revenue
        in descending order.
      </p>

      <h3>Requirements</h3>
      <ul>
        <li>Group by <code>category</code></li>
        <li>Calculate <code>total = sum(quantity × price)</code> for each category</li>
        <li>Round totals to 2 decimal places</li>
        <li>Sort by total in descending order (highest first)</li>
        <li>
          Return as JSON array:
          <code>[{"category": "...", "total": 123.45}, ...]</code>
        </li>
      </ul>

      <h3>Example</h3>
      <p>For input:</p>
      <pre><code>category,quantity,price
Books,5,10.50
Books,3,12.00
Food,10,5.25</code></pre>
      <p>Expected output:</p>
      <pre><code>[
  {"category": "Books", "total": 88.50},
  {"category": "Food", "total": 52.50}
]</code></pre>

      <label for="${id}" class="form-label">
        Enter your JSON result:
      </label>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="6"
        required
      ></textarea>
      <p class="text-muted">
        Your personalized dataset is generated from: ${user.email}
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
