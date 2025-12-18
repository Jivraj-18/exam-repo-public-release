import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-parsing";
  const title = "Data Wrangling: CSV Summation";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random CSV data
  const rows = [];
  const headers = "product,q1,q2,q3";
  const products = ["Widget", "Gadget", "Doodad", "Thingy"];
  
  for(let p of products) {
    rows.push(`${p},${Math.floor(random() * 50)},${Math.floor(random() * 50)},${Math.floor(random() * 50)}`);
  }
  const csvBlock = [headers, ...rows].join("\n");

  // Calculate expected answer (Total sum of all numbers)
  let totalSum = 0;
  rows.forEach(r => {
    const nums = r.split(',').slice(1).map(Number);
    totalSum += nums.reduce((a, b) => a + b, 0);
  });

  const answer = (input) => {
    return parseInt(input) === totalSum;
  };

  const question = html`
    <div class="mb-3">
      <p>You have the following CSV data representing quarterly sales:</p>
      <pre><code>${csvBlock}</code></pre>
      <p><strong>Task:</strong> Calculate the <strong>sum of all numeric values</strong> (q1, q2, and q3) for all products combined.</p>
      
      <label for="${id}" class="form-label">Total Sum:</label>
      <input class="form-control" id="${id}" name="${id}" type="number" />
    </div>
  `;

  return { id, title, weight, question, answer };
}