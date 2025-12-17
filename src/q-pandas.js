import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

const data = [
  { name: "Alice", spend: 500 },
  { name: "Bob", spend: 700 },
  { name: "Alice", spend: 300 },
  { name: "Bob", spend: 900 },
  { name: "Alice", spend: 800 },
];

const tasks = [
  () => {
    // For Alice: values >= 400 → 500, 800
    const avg = (500 + 800) / 2; // 650
    const total = 500 + 800; // 1300
    const count = 2;

    return {
      id: "pandas-multi-metric-alice",
      description: `
Using Pandas:
1. Filter transactions where spend ≥ 400
2. Group by customer name
3. Compute:
   - average spend
   - total spend
   - transaction count
4. Sort by total spend (descending)
5. Print the row for Alice
`,
      expected: {
        avg,
        total,
        count,
      },
      validate: (out) => {
        const text = String(out);
        if (!text.includes("Alice")) throw new Error("Must include Alice");
        if (!text.includes(String(avg))) throw new Error("Average spend incorrect");
        if (!text.includes(String(total))) throw new Error("Total spend incorrect");
        if (!text.includes(String(count))) throw new Error("Transaction count incorrect");
      },
      summary: "aggregated metrics for Alice",
    };
  },
];

export default async function ({ user, weight = 2 }) {
  const id = "q-pandas-multi-concept";
  const title = "Pandas: Multi-Step Data Aggregation";

  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(tasks, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Case Study: Advanced Customer Spend Analysis</h4>

      <p>
        You are given a dataset of customer transactions.
        Each row represents a single transaction.
      </p>

      <pre><code>
name   spend
Alice  500
Bob    700
Alice  300
Bob    900
Alice  800
      </code></pre>

      <p><strong>Task:</strong></p>
      <pre><code>${task.description}</code></pre>

      <p>
        Your solution must use Pandas and demonstrate:
      </p>
      <ul>
        <li>Filtering</li>
        <li>Grouping</li>
        <li>Multiple aggregations</li>
        <li>Sorting</li>
      </ul>

      <label for="${id}" class="form-label">
        Paste your program output
      </label>

      <textarea
        id="${id}"
        name="${id}"
        class="form-control"
        rows="6"
        required
      ></textarea>

      <p class="text-muted">
        Output must include Alice’s name and all computed values.
      </p>
    </div>
  `;

  const answer = async (output) => {
    if (!output) throw new Error("Output required");
    task.validate(String(output));
    return true;
  };

  return { id, title, weight, question, answer };
}
