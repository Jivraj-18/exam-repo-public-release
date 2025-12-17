import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-sqlite-running-total";
    const title = "SQL Window Function: Running Total";

    const random = seedrandom(`${user.email}#${id}`);

    // Data
    const sales = [100, 200, 150, 300, 100];
    // Running totals: 100, 300(100+200), 450(300+150), 750(450+300), 850(750+100)

    const targetIndex = 3; // 4th item (300) -> Running total should be 750
    const runningTotals = [];
    let sum = 0;
    for (let s of sales) {
        sum += s;
        runningTotals.push(sum);
    }
    const expected = runningTotals[targetIndex];

    const answer = (input) => {
        return parseInt(input) === expected;
    };

    const question = html`
    <div class="mb-3">
      <p>
        You have a table <code>daily_sales</code> sorted by date.
        You run this query:
      </p>
      <pre>SELECT amount, SUM(amount) OVER (ORDER BY date) as running_total FROM daily_sales;</pre>
      <p>
        Given the following sequence of <code>amount</code> values (in date order):
        <br><strong>${sales.join(", ")}</strong>
      </p>
      <p>
        What will be the value of <code>running_total</code> for the <strong>4th row</strong> (where amount is ${sales[targetIndex]})?
      </p>
      <label for="${id}" class="form-label">Running Total:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

    return { id, title, weight, question, answer };
}
