import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function({ user, weight = 1.25 }) {
  const id = "q-json-join";
  const title = "Relational Data Join & Aggregate";
  const random = seedrandom(`${user.email}#${id}`);

  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const categories = ["Basic", "Premium", "Enterprise"];

  // 10 Users
  const users = Array.from({ length: 10 }, (_, i) => ({
    user_id: 100 + i,
    segment: pick(categories)
  }));

  // 50 Purchases
  const purchases = Array.from({ length: 50 }, (_, i) => ({
    txn_id: i + 1,
    user_id: pick(users).user_id, // Foreign key
    amount: Math.floor(random() * 100) + 10
  }));

  // Logic: 
  // 1. Join purchases to users on user_id.
  // 2. Group by User Segment.
  // 3. Calculate Total Amount and Average Amount per segment.
  // 4. Return object: {"Basic": {total: 500, avg: 50}, ...}

  const result = {};
  users.forEach(u => {
    if (!result[u.segment]) result[u.segment] = { total: 0, count: 0 };
  });

  purchases.forEach(p => {
    const u = users.find(user => user.user_id === p.user_id);
    if (u) {
      result[u.segment].total += p.amount;
      result[u.segment].count++;
    }
  });

  const expected = Object.entries(result).map(([seg, data]) => ({
    segment: seg,
    total: data.total,
    avg: Number((data.total / data.count).toFixed(2))
  })).sort((a,b) => a.segment.localeCompare(b.segment));

  const answer = (input) => {
    const arr = JSON.parse(input);
    return arr.every((item, i) => 
      item.segment === expected[i].segment && 
      item.total === expected[i].total &&
      Math.abs(item.avg - expected[i].avg) < 0.1
    );
  };

  const question = html`
    <div class="mb-3">
      <p>
        Perform an "Inner Join" and aggregation on the two datasets below.
      </p>
      <ol>
        <li><strong>Users</strong> table contains <code>user_id</code> and <code>segment</code>.</li>
        <li><strong>Purchases</strong> table contains <code>user_id</code> and <code>amount</code>.</li>
        <li>Calculate the <strong>Total Amount</strong> and <strong>Average Amount</strong> (rounded to 2 decimals) per <code>segment</code>.</li>
        <li>Return a sorted JSON array (by Segment A-Z).</li>
      </ol>
      <div class="row">
        <div class="col-6">
          <strong>Users</strong>
          <pre style="max-height:150px; overflow:auto"><code class="language-json">${JSON.stringify(users, null, 2)}</code></pre>
        </div>
        <div class="col-6">
          <strong>Purchases</strong>
          <pre style="max-height:150px; overflow:auto"><code class="language-json">${JSON.stringify(purchases)}</code></pre>
        </div>
      </div>
      <label for="${id}" class="form-label">Result <code>[{segment, total, avg}, ...]</code>:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}