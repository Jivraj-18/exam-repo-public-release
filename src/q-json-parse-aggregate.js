import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-parse-aggregate";
  const title = "Parsing JSON: Aggregate Order Data";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const customers = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];
  const items = ["Laptop", "Phone", "Book", "Headphones", "Keyboard"];

  const orders = Array.from({ length: 12 }, () => ({
    customer: pick(customers),
    item: pick(items),
    quantity: Math.floor(random() * 4) + 1,
    price: Number((50 + random() * 450).toFixed(2)),
  }));

  // Expected result: total revenue per customer
  const expected = {};
  for (const o of orders) {
    expected[o.customer] = Number(
      ((expected[o.customer] || 0) + o.quantity * o.price).toFixed(2),
    );
  }

  const answer = (input) => {
    const parsed = JSON.parse(input);
    return Object.keys(expected).every(
      (k) => parsed[k] !== undefined && Number(parsed[k].toFixed(2)) === expected[k],
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSON array representing customer orders.
        Each object contains a <code>customer</code>, <code>item</code>,
        <code>quantity</code>, and <code>price</code>.
      </p>

      <p>
        <strong>Task:</strong> Parse the JSON and compute the
        <strong>total revenue per customer</strong>.
      </p>

      <ul>
        <li>Total revenue = <code>quantity × price</code></li>
        <li>Aggregate by <code>customer</code></li>
        <li>Round values to 2 decimal places</li>
      </ul>

      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(orders, null, 2)}
      </code></pre>

      <label for="${id}" class="form-label">
        Enter a JSON object mapping customer → total revenue
      </label>

      <input class="form-control" id="${id}" name="${id}" />

      <p class="text-muted">
        Example format:
        <code>{"Alice": 1234.56, "Bob": 987.00}</code>
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
