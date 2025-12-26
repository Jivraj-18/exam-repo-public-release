import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

function monthStr(dt) {
  const d = new Date(dt);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export default async function ({ user, weight = 1 }) {
  const id = "q-excel-powerquery-etl";
  const title = "Revenue by Month & Segment (PQ ETL)";
  const rng = seedrandom(`${user.email}#${id}`);

  const segments = ["Pro", "Starter", "Enterprise"];
  const customers = Array.from({ length: 10 }, (_, i) => ({
    id: `C${i + 1}`,
    segment: segments[Math.floor(rng() * segments.length)],
  }));

  const base = Date.UTC(2025, 2, 1); // March 1, 2025 UTC
  const orders = Array.from({ length: 40 }, (_, i) => ({
    id: `O${i + 1}`,
    customer_id: customers[Math.floor(rng() * customers.length)].id,
    amount: Number((50 + rng() * 950).toFixed(2)),
    ts: new Date(base + Math.floor(rng() * 90) * 24 * 3600 * 1000).toISOString(),
  }));

  // Target the following month explicitly (April 2025)
  const targetMonth = monthStr(new Date(Date.UTC(2025, 3, 1)));
  const targetSegment = segments[Math.floor(rng() * segments.length)];

  // Compute revenue for segment+month
  const custMap = new Map(customers.map((c) => [c.id, c.segment]));
  const revenue = orders
    .filter((o) => monthStr(o.ts) === targetMonth && custMap.get(o.customer_id) === targetSegment)
    .reduce((s, o) => s + o.amount, 0);
  const expected = Number(revenue.toFixed(2));

  const answer = (input) => {
    const x = Number(String(input).trim());
    if (!Number.isFinite(x)) throw new Error("Enter a number");
    if (Math.abs(x - expected) > 0.01) throw new Error("Incorrect revenue");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Build a PowerQuery that merges <code>customers</code> and <code>orders</code>, then create a pivot of revenue by month and segment.
        Using the data below, what is the total revenue for <strong>${targetSegment}</strong> in <strong>${targetMonth}</strong>?
      </p>
      <h6>customers</h6>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(customers, null, 2)}</code></pre>
      <h6>orders</h6>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(orders, null, 2)}</code></pre>
      <label for="${id}" class="form-label">Revenue (${targetSegment}, ${targetMonth}):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
