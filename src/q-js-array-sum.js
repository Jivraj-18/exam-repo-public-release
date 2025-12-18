import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-js-array-sum";
    const title = "JavaScript Array Processing";
    const random = seedrandom(`${user.email}#${id}`);

    const statuses = ["active", "inactive", "pending", "deleted"];
    const transactions = Array.from({ length: 10 }, () => ({
        id: Math.floor(random() * 1000),
        amount: Math.floor(random() * 100),
        status: statuses[Math.floor(random() * statuses.length)]
    }));

    const targetStatus = "active";
    const expectedSum = transactions
        .filter(t => t.status === targetStatus)
        .reduce((sum, t) => sum + t.amount, 0);

    const question = html`
    <div class="mb-3">
      <p>
        Given the array of transactions:
      </p>
      <pre>${JSON.stringify(transactions, null, 2)}</pre>
      <p>
        Calculate the sum of <code>amount</code> for all transactions where <code>status</code> is <code>"${targetStatus}"</code>.
      </p>
      <label for="${id}" class="form-label">Total Sum:</label>
      <input type="number" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

    const answer = (input) => {
        return Number(input) === expectedSum;
    };

    return { id, title, weight, question, answer };
}
