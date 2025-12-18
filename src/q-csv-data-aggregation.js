import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-data-aggregation";
  const title = "Aggregate Sales Data from CSV";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // sample data pools
  const regions = ["North", "South", "East", "West"];
  const products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard"];
  
  // generate 50 sales records
  const sales = Array.from({ length: 50 }, () => ({
    region: pick(regions),
    product: pick(products),
    quantity: Math.floor(random() * 20) + 1,
    price: Number((100 + random() * 900).toFixed(2)),
  }));

  // calculate total revenue by region
  const expectedRevenue = {};
  sales.forEach(({ region, quantity, price }) => {
    const revenue = quantity * price;
    expectedRevenue[region] = (expectedRevenue[region] || 0) + revenue;
  });

  // round to 2 decimal places
  Object.keys(expectedRevenue).forEach(region => {
    expectedRevenue[region] = Number(expectedRevenue[region].toFixed(2));
  });

  // create CSV content
  const csvContent = "region,product,quantity,price\n" + 
    sales.map(s => `${s.region},${s.product},${s.quantity},${s.price}`).join("\n");

  const answer = (input) => {
    const parsed = JSON.parse(input);
    return Object.keys(expectedRevenue).every(region => 
      Math.abs(parsed[region] - expectedRevenue[region]) < 0.01
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        You're analyzing sales data for a company with regional operations.
        Below is a CSV file with <strong>50</strong> sales transactions.
      </p>
      <ol>
        <li>Calculate the <strong>total revenue</strong> for each region (revenue = quantity × price)</li>
        <li>Return a JSON object with region names as keys and total revenue as values</li>
        <li>Round all revenue values to 2 decimal places</li>
      </ol>
      <pre style="white-space: pre-wrap"><code class="language-csv">
${csvContent}
      </code></pre>
      <label for="${id}" class="form-label">
        Revenue by region (JSON object):
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder='{"North": 12345.67, ...}' />
    </div>
  `;

  return { id, title, weight, question, answer };
}
