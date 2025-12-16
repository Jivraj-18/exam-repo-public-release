import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

// Compute and sort products by profit margin
//
// Students are presented with a list of products, each having a cost and a selling price. They
// must calculate the profit margin (selling price minus cost) for each product and return a list
// of products sorted in descending order by their profit margin. Each result object should
// include the original product name and the computed margin rounded to two decimal places.

export default async function ({ user, weight = 1 }) {
  const id = "q-profit-margin-sort";
  const title = "Sort products by profit margin";

  // seeded RNG
  const random = seedrandom(`${user.email}#${id}`);
  const productNames = [
    "Solar Charger",
    "Smart Watch",
    "Bluetooth Speaker",
    "Electric Kettle",
    "Wireless Mouse",
    "Mechanical Keyboard",
    "Desk Lamp",
    "Portable Fan",
    "Fitness Tracker",
    "Noise‑Cancelling Headphones",
  ];

  // generate 10 products with cost between 200 and 5000 and markup up to +200%
  const products = productNames.map((name) => {
    const cost = Number((200 + random() * 4800).toFixed(2));
    // selling price is cost plus 10–200% margin
    const multiplier = 1.1 + random() * 1.0; // between 1.1 and 2.1
    const sellingPrice = Number((cost * multiplier).toFixed(2));
    return { name, cost, sellingPrice };
  });

  // compute expected margins and sort
  const expected = products
    .map((p) => ({ name: p.name, margin: Number((p.sellingPrice - p.cost).toFixed(2)) }))
    .sort((a, b) => b.margin - a.margin);

  const answer = (input) => {
    let arr;
    try {
      arr = JSON.parse(input);
    } catch (err) {
      throw new Error("Input must be valid JSON array");
    }
    if (!Array.isArray(arr) || arr.length !== expected.length) {
      throw new Error("Return value must be an array of the correct length");
    }
    for (let i = 0; i < expected.length; i++) {
      const provided = arr[i];
      const exp = expected[i];
      if (provided.name !== exp.name) {
        throw new Error("Product order mismatch");
      }
      // allow small rounding difference
      if (Math.abs(Number(provided.margin) - exp.margin) > 0.01) {
        throw new Error("Incorrect margin for " + provided.name);
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        A list of products is provided, each with a <code>cost</code> and a <code>sellingPrice</code> (rupees).
        Compute the profit margin (sellingPrice − cost) for each product and return a JSON array
        of objects with two properties: <code>name</code> and <code>margin</code>. Sort the array in
        descending order by <code>margin</code>. Round margins to two decimal places.
      </p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(products, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Products by margin (JSON array):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
