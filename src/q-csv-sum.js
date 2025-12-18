import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default function ({ user, weight }) {
  const id = "q-csv-sum";
  const title = "CSV Data Analysis";
  const rng = seedrandom(user.email + id);

  const headers = "Product,Category,Quantity,Price";
  const products = ["Widget", "Gadget", "Doohickey", "Thingamajig"];
  const categories = ["Hardware", "Software", "Services"];

  const rows = [];
  let totalSales = 0;

  for (let i = 0; i < 20; i++) {
    const prod = products[Math.floor(rng() * products.length)];
    const cat = categories[Math.floor(rng() * categories.length)];
    const qty = Math.floor(rng() * 10) + 1;
    const price = Math.floor(rng() * 90) + 10;

    totalSales += qty;

    rows.push(`${prod},${cat},${qty},${price}`);
  }

  const csv = [headers, ...rows].join("\n");

  const question = html`
    <div>
      <h3>${title}</h3>
      <p>Calculate the <strong>sum of the 'Quantity' column</strong> in the CSV data below.</p>
      <pre class="overflow-auto" style="max-height: 200px; background: #f8f9fa; padding: 10px;">${csv}</pre>
      <label>Total Quantity:</label>
      <input type="number" name="answer" />
    </div>
  `;

  return {
    id,
    title,
    weight,
    question,
    answer: (answer) => parseInt(answer) === totalSales,
  };
}
