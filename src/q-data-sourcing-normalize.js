import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;
const pick = (random, arr) => arr[randInt(random, 0, arr.length - 1)];

const buildRecords = (random) => {
  const vendors = ["NimbusMart", "DataBay", "PixelWorks", "StreamHub"]; 
  const base = [];
  let txnId = 3100;
  for (let i = 0; i < 6; i += 1) {
    const vendor = pick(random, vendors);
    const amount = randInt(random, 1200, 3200) + randInt(random, 0, 99) / 100;
    const ts = `2025-0${randInt(random, 6, 9)}-${randInt(random, 10, 27)}T0${randInt(random, 1, 8)}:${randInt(random, 10, 59)}`;
    base.push({ txnId: txnId.toString(), vendor, amount: Number(amount.toFixed(2)), currency: "INR", ts });
    txnId += randInt(random, 1, 3);
  }

  // Add duplicates with newer timestamps and occasional missing amounts
  const dup = pick(random, base);
  base.push({ ...dup, amount: null, ts: `2025-10-${randInt(random, 10, 20)}T${randInt(random, 10, 23)}:${randInt(random, 10, 59)}` });
  const dup2 = pick(random, base);
  base.push({ ...dup2, amount: Number((dup2.amount ?? 0 + randInt(random, 10, 80) / 100).toFixed(2)), ts: `2025-11-${randInt(random, 5, 18)}T${randInt(random, 10, 22)}:${randInt(random, 10, 59)}` });

  return base;
};

const aggregate = (records) => {
  const latest = new Map();
  for (const rec of records) {
    const key = rec.txnId;
    const curr = latest.get(key);
    if (!curr || curr.ts < rec.ts) latest.set(key, rec);
  }
  const totals = {};
  for (const rec of latest.values()) {
    const amt = Number.isFinite(rec.amount) ? rec.amount : 0;
    totals[rec.vendor] = Number(((totals[rec.vendor] || 0) + amt).toFixed(2));
  }
  return totals;
};

export default async function({ user, weight = 1 }) {
  const id = "q-data-sourcing-normalize";
  const title = "Normalize API Invoices";
  const random = seedrandom(`${user.email}#${id}`);

  const records = buildRecords(random);
  const expected = aggregate(records);

  const question = html`
    <div class="mb-3">
      <h4>Data Sourcing + Prep: Clean invoice feed</h4>
      <p>
        You receive invoice events from two APIs. Records share <code>txnId</code>; newer timestamps replace older ones.
        Missing <code>amount</code> counts as 0. All currency is INR.
      </p>
      <p class="mb-2">Deduplicate by <code>txnId</code> (keep latest), then sum <code>amount</code> per vendor. Return a compact JSON object like <code>{"Vendor":1234.56}</code>.</p>
      <pre style="white-space: pre-wrap"><code class="language-json">${JSON.stringify(records, null, 2)}</code></pre>
      <input class="form-control" id="${id}" name="${id}" placeholder='{"Vendor":123.45}' />
    </div>
  `;

  const answer = (input) => {
    if (!input) throw new Error("Answer required");
    let data;
    try {
      data = JSON.parse(String(input));
    } catch {
      throw new Error("Must be valid JSON object");
    }
    if (data === null || typeof data !== "object" || Array.isArray(data)) throw new Error("Must be an object");
    const keys = Object.keys(expected).sort();
    const receivedKeys = Object.keys(data).sort();
    if (keys.length !== receivedKeys.length || !keys.every((k, i) => k === receivedKeys[i])) return false;
    return keys.every((k) => Math.abs(Number(data[k]) - expected[k]) < 0.01);
  };

  return { id, title, weight, question, answer };
}
