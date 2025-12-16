import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-aggregate-sales-excel";
  const title = "Aggregate sales by region (CSV upload)";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North", "South", "East", "West"];
  const products = ["Gizmo", "Widget", "Doohickey"];

  // Generate 120 transactions spread over 30 days
  const rows = ["date,region,product,amount"];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const expected = Object.fromEntries(regions.map((r) => [r, 0]));

  for (let i = 0; i < 120; i++) {
    const date = new Date(now - Math.floor(random() * 30) * dayMs);
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const amount = Number((random() * 900 + 100).toFixed(2));
    rows.push(`${date.toISOString().slice(0, 10)},${region},${product},${amount}`);
    expected[region] += amount;
  }

  // Create CSV blob and URL for download
  const csv = rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const answer = async (file) => {
    if (!file || !file.size) throw new Error("No file uploaded");
    const text = await file.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) throw new Error("CSV looks empty");
    const header = lines[0].split(",").map((s) => s.trim().toLowerCase());
    const regionIdx = header.indexOf("region");
    const amountIdx = header.indexOf("amount");
    if (regionIdx === -1 || amountIdx === -1) throw new Error("CSV must have `region` and `amount` columns");

    const totals = {};
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",");
      const reg = cols[regionIdx].trim();
      const amt = Number(cols[amountIdx]);
      if (!Number.isFinite(amt)) throw new Error(`Invalid amount on line ${i + 1}`);
      totals[reg] = (totals[reg] || 0) + amt;
    }

    // Compare totals (allow tiny floating rounding differences)
    for (const r of Object.keys(expected)) {
      const want = Number(expected[r].toFixed(2));
      const got = Number((totals[r] || 0).toFixed(2));
      if (Math.abs(want - got) > 0.01) {
        throw new Error(`Region ${r} total mismatch: expected ${want} got ${got}`);
      }
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <p><strong>Case Study: Region-level sales rollup</strong></p>
      <p>
        You have been given a raw export of daily transactions for a retail platform. Your task is to compute the
        total sales per region and submit a CSV with two columns: <code>region,total</code> (header included). Use the
        sample data provided below as the input file.
      </p>
      <p>
        <a download="transactions.csv" href="${url}" class="btn btn-outline-primary">Download sample transactions.csv</a>
      </p>
      <label for="${id}" class="form-label">Upload your aggregated CSV (region,total)</label>
      <input class="form-control" id="${id}" name="${id}" type="file" accept="text/csv" />
      <p class="text-muted">Your CSV should look like:<br /><code>region,total\nNorth,12345.67</code></p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
