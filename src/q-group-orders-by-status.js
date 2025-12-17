import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-group-orders-status";
  const title = "Group Orders by Status and Sum Amounts";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  const statuses = ["PLACED", "SHIPPED", "DELIVERED", "CANCELLED"];

  const orders = Array.from({ length: 80 }, (_, i) => ({
    orderId: i + 1,
    status: pick(statuses),
    amount: Number((50 + random() * 450).toFixed(2)),
  }));

  const expected = Object.values(
    orders.reduce((acc, o) => {
      acc[o.status] ??= { status: o.status, totalAmount: 0 };
      acc[o.status].totalAmount += o.amount;
      acc[o.status].totalAmount = Number(acc[o.status].totalAmount.toFixed(2));
      return acc;
    }, {}),
  ).sort((a, b) => a.status.localeCompare(b.status));

  const answer = (input) => {
    const arr = JSON.parse(input);
    return (
      arr.length === expected.length &&
      arr.every(
        (o, i) =>
          o.status === expected[i].status &&
          o.totalAmount === expected[i].totalAmount,
      )
    );
  };

  const question = html`
    <p>
      You are given a list of <strong>80</strong> orders with a
      <code>status</code> and <code>amount</code>.
    </p>
    <ol>
      <li>Group orders by <code>status</code>.</li>
      <li>For each status, compute <code>totalAmount</code>.</li>
      <li>Sort the result by <code>status</code> (A→Z).</li>
      <li>Return a minified JSON array.</li>
    </ol>
    <pre><code class="language-json">${JSON.stringify(orders)}</code></pre>
    <input class="form-control" id="${id}" />
  `;

  return { id, title, weight, question, answer };
}
