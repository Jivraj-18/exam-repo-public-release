import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-excel-pivot-category";
  const title = "Pivot Analysis: Highest Average Order";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["Electronics", "Home", "Fashion", "Beauty", "Sports"];
  const rows = [["order_id", "category", "amount"]];
  
  const categoryTotals = {};
  const categoryCounts = {};

  for (let i = 0; i < 300; i++) {
    const cat = pick(categories, random);
    const basePrice = 20 + Math.floor(random() * 80); // 20-100
    // Electronics are more expensive
    const multiplier = cat === "Electronics" ? 3 : 1;
    const finalAmount = basePrice * multiplier;

    rows.push([`ORD-${i}`, cat, finalAmount]);

    if (!categoryTotals[cat]) { categoryTotals[cat] = 0; categoryCounts[cat] = 0; }
    categoryTotals[cat] += finalAmount;
    categoryCounts[cat]++;
  }

  let highestAvg = -1;
  let winningCategory = "";

  for (const cat of categories) {
    const avg = categoryTotals[cat] / categoryCounts[cat];
    if (avg > highestAvg) {
        highestAvg = avg;
        winningCategory = cat;
    }
  }

  const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    if (value.trim().toLowerCase() !== winningCategory.toLowerCase()) throw new Error("Incorrect category.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="pivot-avg">Sales: Highest Value Category</h2>
      <p>
        The sales team wants to know which product category yields the highest <strong>Average Order Value (AOV)</strong>.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Download the sales data.</li>
        <li>Group by <code>category</code>.</li>
        <li>Calculate the Average of <code>amount</code> for each category.</li>
        <li>Identify the category with the highest average.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        Which category has the highest Average Order Value?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="text" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}