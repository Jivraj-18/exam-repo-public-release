import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const toIsoDate = (d) => d.toISOString().slice(0, 10);

const fmtMoney = (n, random) => {
  const base = n.toFixed(2);
  const withComma = base.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const styles = [
    base,
    `$${base}`,
    `$ ${base}`,
    `$${withComma}`,
    withComma,
    `${base} USD`,
  ];
  return pick(styles, random);
};

const fmtDateMessy = (d, random) => {
  const iso = d.toISOString();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ddMon = `${day}-${months[d.getUTCMonth()]}-${y}`;
  const us = `${m}/${day}/${y}`;
  const styles = [
    iso,
    `${y}-${m}-${day}`,
    `${y}-${m}-${day} ${String(d.getUTCHours()).padStart(2, "0")}:${String(d.getUTCMinutes()).padStart(2, "0")}:${
      String(d.getUTCSeconds()).padStart(2, "0")
    }Z`,
    ddMon,
    us,
  ];
  return pick(styles, random);
};

const parseAmount = (text) => {
  const s = String(text ?? "").trim();
  if (!s) return null;
  if (/^n\/a$/i.test(s)) return null;
  const cleaned = s.replace(/[^\d.-]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
};

export default async function({ user, weight = 1 }) {
  const id = "q-python-pandas-clean-orders";
  const title = "Python Data Prep (pandas): Clean an Orders CSV";
  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["AMER", "EMEA", "APAC"];
  const region = pick(regions, random);

  const statuses = ["PAID", "REFUNDED", "TEST", "CHARGEBACK"];
  const start = new Date("2024-01-01T00:00:00Z");
  const end = new Date("2024-12-31T23:59:59Z");
  const randDate = () => new Date(start.getTime() + random() * (end.getTime() - start.getTime()));
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  /** @type {Array<{order_id: string, created_at_raw: string, amount_raw: string, status: string, region: string}>} */
  const rows = [];

  // Generate base orders.
  const baseCount = 220;
  for (let i = 1; i <= baseCount; i++) {
    const orderId = `O${String(i).padStart(5, "0")}`;
    const createdAt = randDate();
    const amount = (15 + random() * 985) * (random() < 0.08 ? -1 : 1);
    const status = pick(statuses, random);
    const reg = pick(regions, random);

    const amountRaw = random() < 0.06 ? "N/A" : random() < 0.08 ? "" : fmtMoney(amount, random);
    rows.push({
      order_id: orderId,
      created_at_raw: fmtDateMessy(createdAt, random),
      amount_raw: amountRaw,
      status,
      region: reg,
    });
  }

  // Add duplicates with later timestamps (simulate reingestion).
  const dupCount = 35;
  for (let i = 0; i < dupCount; i++) {
    const src = rows[randInt(0, rows.length - 1)];
    const bumpDays = randInt(1, 25);
    const createdAt = new Date(Date.parse(src.created_at_raw) || start);
    const later = new Date(createdAt.getTime() + bumpDays * 24 * 60 * 60 * 1000);
    rows.push({
      order_id: src.order_id,
      created_at_raw: fmtDateMessy(later, random),
      amount_raw: random() < 0.25 ? src.amount_raw : fmtMoney(15 + random() * 985, random),
      status: pick(statuses, random),
      region: src.region,
    });
  }

  const header = ["order_id", "created_at", "amount_usd", "status", "region"];
  const csv = [header.join(",")]
    .concat(
      rows.map((r) => {
        // keep it CSV-simple: no quotes needed with current generators
        return [r.order_id, r.created_at_raw, r.amount_raw, r.status, r.region].join(",");
      }),
    )
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  // Expected: pandas-style cleaning + dedupe by latest parsed created_at, PAID only, positive amounts only.
  const parsed = rows
    .map((r) => {
      const dt = Date.parse(r.created_at_raw);
      const createdAt = Number.isFinite(dt) ? new Date(dt) : null;
      const amount = parseAmount(r.amount_raw);
      return { ...r, createdAt, amount };
    })
    .filter((r) => r.createdAt && r.status === "PAID" && r.region === region && r.amount !== null && r.amount > 0);

  /** @type {Map<string, {createdAt: Date, amount: number}>} */
  const latestByOrder = new Map();
  for (const r of parsed) {
    const existing = latestByOrder.get(r.order_id);
    if (!existing || r.createdAt.getTime() > existing.createdAt.getTime()) {
      latestByOrder.set(r.order_id, { createdAt: r.createdAt, amount: /** @type {number} */ (r.amount) });
    }
  }

  const targetMonth = "2024-06";
  let expectedTotal = 0;
  for (const { createdAt, amount } of latestByOrder.values()) {
    if (toIsoDate(createdAt).slice(0, 7) === targetMonth) expectedTotal += amount;
  }
  expectedTotal = Math.round(expectedTotal * 100) / 100;

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d.-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the cleaned June 2024 revenue as a number.");
    if (Math.abs(numeric - expectedTotal) > 0.01) {
      throw new Error(
        `Revenue mismatch. Make sure you (1) parse dates, (2) keep only PAID, (3) filter region=${region}, (4) drop non-positive/blank amounts, (5) dedupe by order_id keeping latest created_at, (6) sum only ${targetMonth}.`,
      );
    }
    return true;
  };

  const preview = csv.split("\n").slice(0, 16).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Clean orders data with <code>pandas</code></h2>
      <p>
        You work on the finance data pipeline. The raw export is messy: dates come in multiple formats, amounts include
        symbols/commas, there are duplicates due to re-ingestion, and some rows are tests/refunds.
      </p>

      <h3>Your task (use Python + pandas)</h3>
      <ol>
        <li>Load the CSV.</li>
        <li>Parse <code>created_at</code> into a datetime.</li>
        <li>Clean <code>amount_usd</code> into a numeric value; treat blanks / <code>N/A</code> as missing.</li>
        <li>Keep only rows where <code>status == "PAID"</code>, <code>region == "${region}"</code>, and amount &gt; 0.</li>
        <li>
          Deduplicate by <code>order_id</code>, keeping the row with the <em>latest</em> parsed <code>created_at</code>.
        </li>
        <li>Sum amount for orders whose <code>created_at</code> month is <strong>2024-06</strong> (UTC).</li>
      </ol>

      <p>
        Download:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <details class="mb-3">
        <summary>Preview (first 15 lines)</summary>
        <pre style="white-space: pre-wrap"><code class="language-csv">${preview}</code></pre>
      </details>

      <label for="${id}" class="form-label">
        What is the cleaned total revenue (USD) for <strong>${region}</strong> in <strong>June 2024</strong>?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Answer as a number (we accept small formatting differences).</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


