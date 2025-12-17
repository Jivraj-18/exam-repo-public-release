import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-flatten-orders";
  const title = "Flatten Nested Customer Orders";

  // Sample nested JSON orders
  const data = [
    { orderId: 1, customer: "Alice", items: [{ product: "Laptop", qty: 1 }, { product: "Mouse", qty: 2 }] },
    { orderId: 2, customer: "Bob", items: [{ product: "Keyboard", qty: 1 }] },
    { orderId: 3, customer: "Alice", items: [{ product: "Monitor", qty: 2 }] },
    { orderId: 4, customer: "Charlie", items: [{ product: "Laptop", qty: 1 }, { product: "Keyboard", qty: 1 }] }
  ];

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  const answer = async (value) => {
    let parsed;
    try { parsed = JSON.parse(value); }
    catch { throw new Error("Enter a valid JSON array."); }

    // Flatten expected output: [{orderId, customer, product, qty}, ...]
    const flat = [];
    data.forEach(order => {
      order.items.forEach(item => {
        flat.push({
          orderId: order.orderId,
          customer: order.customer,
          product: item.product,
          qty: item.qty
        });
      });
    });

    // Check correctness
    const sortFn = (a, b) => a.orderId - b.orderId || a.product.localeCompare(b.product);
    const flatSorted = flat.sort(sortFn);
    const parsedSorted = parsed.sort(sortFn);

    if (JSON.stringify(flatSorted) !== JSON.stringify(parsedSorted)) {
      throw new Error(`Incorrect. Ensure you flatten all items with orderId, customer, product, and qty.`);
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Flatten Nested Customer Orders</h2>
      <p>
        You are given a nested JSON array of customer orders. Each order contains multiple items. Flatten the structure 
        into a single array of objects with <code>orderId</code>, <code>customer</code>, <code>product</code>, and <code>qty</code>.
      </p>
      <p>
        Download the dataset:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>
      <label for="${id}" class="form-label">
        Enter the flattened JSON array.
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Example: [{"orderId":1,"customer":"Alice","product":"Laptop","qty":1}, ...]</p>
    </div>
  `;

  return { id, title, weight, question, answer };
};
