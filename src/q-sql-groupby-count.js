import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-sql-groupby-count";
    const title = "SQL Group By & Having";
    const random = seedrandom(`${user.email}#${id}`);

    // Generate data
    const customers = ["A", "B", "C", "D"];
    const orders = [];
    for (let i = 0; i < 20; i++) {
        orders.push({ id: i + 1, customer: customers[Math.floor(random() * customers.length)] });
    }

    const minCount = Math.floor(random() * 3) + 2; // 2-4

    // Calculate expected
    const counts = {};
    orders.forEach(o => counts[o.customer] = (counts[o.customer] || 0) + 1);
    const result = Object.entries(counts)
        .filter(([_, count]) => count > minCount)
        .sort((a, b) => a[0].localeCompare(b[0])) // Sort by customer ID for consistency
        .map(([cust, count]) => ({ customer: cust, count }));

    const question = html`
    <div class="mb-3">
      <p>
        Consider the <code>orders</code> table data:
      </p>
      <pre>${orders.map(o => `Order ${o.id}: Customer ${o.customer}`).join('\n')}</pre>
      <p>
        You run the query:
        <br>
        <code>SELECT customer, COUNT(*) as count FROM orders GROUP BY customer HAVING COUNT(*) > ${minCount} ORDER BY customer ASC</code>
      </p>
      <p>
        Provide the result as a JSON array of objects (e.g. <code>[{"customer":"A","count":5}, ...]</code>).
      </p>
      <label for="${id}" class="form-label">Result JSON:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        try {
            const arr = JSON.parse(input);
            if (!Array.isArray(arr)) return false;
            if (arr.length !== result.length) return false;
            return arr.every((row, i) => row.customer === result[i].customer && row.count === result[i].count);
        } catch (e) {
            return false;
        }
    };

    return { id, title, weight, question, answer };
}
