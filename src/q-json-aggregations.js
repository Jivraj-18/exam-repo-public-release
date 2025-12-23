import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
    const id = "q-json-aggregations";
    const title = "Aggregate Sales by Category";

    const random = seedrandom(`${user.email}#${id}`);
    const pick = (arr) => arr[Math.floor(random() * arr.length)];

    const categories = ["Electronics", "Clothing", "Home", "Sports"];
    const sales = Array.from({ length: 50 }, () => ({
        category: pick(categories),
        amount: Math.floor(random() * 100) + 10
    }));

    // Calculate expected result: map of category -> total amount
    const expected = {};
    for (const s of sales) {
        expected[s.category] = (expected[s.category] || 0) + s.amount;
    }

    const answer = (input) => {
        const userResult = JSON.parse(input);
        const expectedKeys = Object.keys(expected).sort();
        const userKeys = Object.keys(userResult).sort();

        if (JSON.stringify(expectedKeys) !== JSON.stringify(userKeys)) {
            throw new Error("Mismatch in categories");
        }

        for (const key of expectedKeys) {
            if (userResult[key] !== expected[key]) {
                throw new Error(`Incorrect total for ${key}. Expected ${expected[key]}, got ${userResult[key]}`);
            }
        }
        return true;
    };

    const question = html`
    <div class="mb-3">
      <h4>Aggregate Sales Data</h4>
      <p>
        Given the following list of sales transactions, calculate the <strong>total sales amount</strong> for each category.
      </p>
      <pre style="max-height: 200px; overflow: auto; background: #f8f9fa; padding: 10px;"><code>${JSON.stringify(sales, null, 2)}</code></pre>
      <p>
        Submit a JSON object where keys are categories and values are the total amounts.
        Example: <code>{"Electronics": 1500, "Clothing": 500}</code>
      </p>
      <label for="${id}" class="form-label">Result JSON</label>
      <input class="form-control" id="${id}" name="${id}" placeholder='{"Category": Total...}' />
    </div>
  `;

    return { id, title, weight, question, answer };
}
