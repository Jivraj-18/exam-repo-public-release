import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-pandas-groupby";
  const title = "Pandas GroupBy Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["A", "B", "C"];
  const data = Array.from({ length: 15 }, (_, i) => ({
    transaction_id: 2001 + i,
    category: categories[Math.floor(random() * categories.length)],
    units: Math.floor(1 + random() * 5),
    unit_price: Math.floor(100 + random() * 300),
  }));

  // Hidden calculation
  const revenueByCategory = {};
  for (const row of data) {
    revenueByCategory[row.category] =
      (revenueByCategory[row.category] || 0) +
      row.units * row.unit_price;
  }

  // Category to query
  const targetCategory = categories[Math.floor(random() * categories.length)];
  const answer = revenueByCategory[targetCategory];

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing transactional sales data using
        <strong>pandas</strong>.
      </p>

      <h6>Input Dataset</h6>
      <pre><code class="language-json">${JSON.stringify(data, null, 2)}</code></pre>

      <h6>Task</h6>
      <ol>
        <li>Load the data into a pandas DataFrame</li>
        <li>
          Use <code>groupby</code> on <code>category</code>
        </li>
        <li>
          Compute total revenue per category as:
          <pre><code>sum(units × unit_price)</code></pre>
        </li>
      </ol>

      <p>
        After grouping, focus on category
        <strong>${targetCategory}</strong>.
      </p>

      <label for="${id}" class="form-label">
        What is the total revenue for category ${targetCategory}?
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
