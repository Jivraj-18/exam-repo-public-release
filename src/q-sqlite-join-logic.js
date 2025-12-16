import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-sqlite-join-logic-24f2007692";
    const title = "Relational Data Logic (Join)";
    const rng = seedrandom(`${user.email}#${id}`);

    // Users
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Carol" }
    ];

    // Orders
    const orders = [];
    const numOrders = 5 + Math.floor(rng() * 5);
    for (let i = 0; i < numOrders; i++) {
        orders.push({
            orderId: 100 + i,
            userId: Math.floor(rng() * 3) + 1, // 1, 2, or 3
            amount: Math.floor(rng() * 100) + 10
        });
    }

    // Target User
    const targetUser = users[Math.floor(rng() * users.length)];

    // Calculate expected sum
    const total = orders
        .filter(o => o.userId === targetUser.id)
        .reduce((sum, o) => sum + o.amount, 0);

    const question = html`
    <div class="mb-3">
      <p>Given the following two datasets (JSON):</p>
      <strong>Users</strong>
      <pre><code>${JSON.stringify(users, null, 2)}</code></pre>
      <strong>Orders</strong>
      <pre><code>${JSON.stringify(orders, null, 2)}</code></pre>
      <p>
        Calculate the <strong>Total Order Amount</strong> for user <strong>"${targetUser.name}"</strong> (ID: ${targetUser.id}).
        <br><small>(Equivalent to: <code>SELECT SUM(amount) FROM Orders WHERE userId = ${targetUser.id}</code>)</small>
      </p>
      <label for="${id}" class="form-label">Total Amount:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required>
    </div>
  `;

    const answer = (val) => Number(val) === total;

    return { id, title, weight, question, answer };
}
