import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1.25 }) {
  const id = "q-pareto-analysis";
  const title = "Analysis: Pareto Principle (80/20)";
  const random = seedrandom(`${user.email}#${id}`);

  const products = [];
  const count = 100;
  
  // Generate power-law distribution (few items have high revenue)
  for (let i = 0; i < count; i++) {
    // Random revenue between 100 and 100,000 using exponent to skew
    const rev = Math.floor(Math.pow(random(), 4) * 50000) + 100;
    products.push({ sku: `SKU-${i+100}`, revenue: rev });
  }

  // Sort Descending
  products.sort((a, b) => b.revenue - a.revenue);

  // Calculate Total Revenue
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const targetRevenue = totalRevenue * 0.80;

  // Calculate Count to reach 80%
  let currentSum = 0;
  let skuCount = 0;
  for (const p of products) {
    currentSum += p.revenue;
    skuCount++;
    if (currentSum >= targetRevenue) break;
  }

  const csv = "sku,annual_revenue\n" + 
    // Shuffle before export so user has to sort themselves
    products.sort(() => random() - 0.5).map(p => `${p.sku},${p.revenue}`).join("\n");

  const answer = async (value) => {
        const numeric = parseInt(value);
        if (isNaN(numeric)) throw new Error("Please enter a whole number representing the count of SKUs.");
        
        if (numeric === Math.round(count * 0.8)) {
            throw new Error("Incorrect. It looks like you calculated 80% of the number of items, rather than the count of items required to reach 80% of the revenue.");
        }
        
        if (numeric !== skuCount) {
            throw new Error("The SKU count does not match. Did you remember to sort the revenue in descending order before calculating the cumulative sum?");
        }
        return true;
    };

  const question = html`
    <div class="mb-3">
      <h2>Inventory Pareto Analysis</h2>
      <p>
        The "80/20 Rule" suggests that a small number of products often generate the majority of revenue.
        Your task is to identify the <strong>minimum number of unique SKUs</strong> required to generate <strong>at least 80%</strong> of the total annual revenue.
      </p>
      <ol>
        <li>Calculate the total revenue of the dataset.</li>
        <li>Sort products by revenue (descending).</li>
        <li>Calculate the cumulative revenue.</li>
        <li>Count how many items it takes to cross the 80% threshold.</li>
      </ol>
      <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(new Blob([csv], {type: "text/csv"}), `${id}.csv`)}>
        Download inventory.csv
      </button>
      <div class="mt-3">
        <label>Number of SKUs making up 80% revenue:</label>
        <input type="number" class="form-control" id="${id}" name="${id}" required />
      </div>
    </div>
  `;

  return { id, title, weight, question, answer };
}