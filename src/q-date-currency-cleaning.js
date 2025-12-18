import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-date-currency-cleaning";
  const title = "Date + currency cleanup variance";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randint = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const regions = [
    { canonical: "North America", variants: ["North America", "N. America", "NA", "N America", "North-America"] },
    { canonical: "Asia Pacific", variants: ["Asia Pacific", "APAC", "Asia-Pac", "Asia  Pacific"] },
    { canonical: "Europe", variants: ["Europe", "EU", "E.U."] },
  ];

  const categories = ["Logistics", "Fulfillment", "Marketing", "Support", "Procurement"];
  const teams = ["Ops", "Fin", "RevOps", "Supply", "SRE"];

  const periodFormats = [
    "iso", // YYYY-MM-DD
    "dmy", // DD/MM/YYYY
    "mon", // Mon DD, YYYY
    "qtr", // YYYY Qn
  ];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const toIsoDate = (d) => d.toISOString().slice(0, 10);

  const formatPeriod = (date, kind) => {
    const y = date.getUTCFullYear();
    const m = date.getUTCMonth();
    const day = date.getUTCDate();
    if (kind === "iso") return `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (kind === "dmy") return `${String(day).padStart(2, "0")}/${String(m + 1).padStart(2, "0")}/${y}`;
    if (kind === "mon") return `${monthNames[m]} ${String(day).padStart(2, "0")}, ${y}`;
    if (kind === "qtr") {
      const q = Math.floor(m / 3) + 1;
      return `${y} Q${q}`;
    }
    return toIsoDate(date);
  };

  const normalizeRegion = (s) => {
    const cleaned = String(s)
      .toLowerCase()
      .replace(/[^a-z]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    if (cleaned === "north america" || cleaned === "n america" || cleaned === "na") return "North America";
    if (cleaned === "asia pacific" || cleaned === "asia pac" || cleaned === "apac") return "Asia Pacific";
    if (cleaned === "europe" || cleaned === "eu") return "Europe";
    return s.trim();
  };

  const parseClosingPeriod = (s) => {
    const str = String(s).trim();
    // Quarter like "2024 Q3" -> last day of that quarter
    const qm = str.match(/^(\d{4})\s*Q([1-4])$/i);
    if (qm) {
      const year = Number(qm[1]);
      const q = Number(qm[2]);
      const endMonth = q * 3; // 3,6,9,12
      const lastDay = new Date(Date.UTC(year, endMonth, 0)); // day 0 of next month = last day prev month
      return toIsoDate(lastDay);
    }
    // DD/MM/YYYY
    const dmy = str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (dmy) {
      const dd = Number(dmy[1]);
      const mm = Number(dmy[2]);
      const yyyy = Number(dmy[3]);
      return toIsoDate(new Date(Date.UTC(yyyy, mm - 1, dd)));
    }
    // Mon DD, YYYY
    const mon = str.match(/^([A-Za-z]{3})\s+(\d{2}),\s+(\d{4})$/);
    if (mon) {
      const m = monthNames.indexOf(mon[1]);
      const dd = Number(mon[2]);
      const yyyy = Number(mon[3]);
      return toIsoDate(new Date(Date.UTC(yyyy, m, dd)));
    }
    // ISO YYYY-MM-DD
    const iso = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return str;
    throw new Error(`Unrecognized date format: ${str}`);
  };

  const parseMoney = (s) => {
    const str = String(s ?? "").trim();
    if (!str) return null;
    if (/tbd/i.test(str)) return null;
    const cleaned = str.replace(/[^0-9.\-]/g, "");
    if (!cleaned) return null;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : null;
  };

  // Build a synthetic "operational close" CSV
  const header = [
    "record_id",
    "region",
    "closing_period",
    "revenue_reported",
    "expense_reported",
    "ops_notes",
    "controller_comments",
  ];
  const rows = [header];

  const csvEscape = (value) => {
    const s = String(value ?? "");
    // Quote if it contains a comma, quote, or newline (RFC4180-ish).
    if (!/[,"\n\r]/.test(s)) return s;
    return `"${s.replace(/"/g, '""')}"`;
  };

  const cutoff = "2024-04-01";
  let expectedVariance = 0;
  let ensuredMatch = false;

  const base = new Date("2024-01-10T00:00:00Z").getTime();

  const recordCount = 85;
  for (let i = 0; i < recordCount; i++) {
    const record_id = `RID-${String(10000 + i)}${random() < 0.2 ? "  " : ""}`;
    const regionGroup = pick(regions);
    const region = pick(regionGroup.variants);
    const date = new Date(base + randint(0, 210) * 24 * 60 * 60 * 1000);
    const closing_period = formatPeriod(date, pick(periodFormats));

    const category = pick(categories);
    const team = pick(teams);
    const fq = formatPeriod(date, "qtr");
    const ops_notes = `${category}|${team}|${fq}`;

    const revenue = Number((5000 + random() * 45000).toFixed(2));

    const expenseKind = pick(["normal", "blank", "tbd"]);
    let expense = null;
    if (expenseKind === "normal") {
      // Expense around 60-110% of revenue
      expense = Number((revenue * (0.6 + random() * 0.5)).toFixed(2));
    }

    const revenueStr = pick([
      `$${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `USD ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `${revenue.toFixed(2)}`,
      ` $ ${revenue.toFixed(2)} `,
    ]);

    const expenseStr =
      expenseKind === "blank"
        ? ""
        : expenseKind === "tbd"
        ? "USD TBD"
        : pick([
          `$${expense.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          `USD ${expense.toFixed(2)}`,
          `${expense.toFixed(2)}`,
        ]);

    const controller_comments = pick([
      "",
      "awaiting invoice",
      "manual adjustment later",
      "region alias used",
      "check date format",
    ]);

    rows.push([record_id, region, closing_period, revenueStr, expenseStr, ops_notes, controller_comments]);

    // Compute expected variance under the same rules
    const canonicalRegion = normalizeRegion(region);
    let parsedDate;
    try {
      parsedDate = parseClosingPeriod(closing_period);
    } catch {
      // For generated data this shouldn't happen; ignore row if it does.
      continue;
    }
    const revenueNum = parseMoney(revenueStr) ?? 0;
    let expenseNum = parseMoney(expenseStr);
    if (expenseNum === null) expenseNum = Number((revenueNum * 0.37).toFixed(2));

    const opsCategory = ops_notes.split("|")[0];
    const match = canonicalRegion === "North America" && opsCategory === "Logistics" && parsedDate <= cutoff;
    if (match) {
      expectedVariance += revenueNum - expenseNum;
      ensuredMatch = true;
    }
  }

  // Guarantee at least one matching Logistics+North America row <= cutoff.
  if (!ensuredMatch) {
    const record_id = "RID-99999";
    const region = "N. America";
    const closing_period = "2024 Q1"; // -> 2024-03-31
    const revenueStr = "$10000.00";
    const expenseStr = "USD TBD"; // -> 3700.00
    const ops_notes = "Logistics|Ops|2024 Q1";
    const controller_comments = "forced match";
    rows.push([record_id, region, closing_period, revenueStr, expenseStr, ops_notes, controller_comments]);
    expectedVariance += 10000 - 3700;
  }

  expectedVariance = Number(expectedVariance.toFixed(2));
  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\n") + "\n";
  const blob = new Blob([csv], { type: "text/csv" });

  const answer = async (input) => {
    if (!input) throw new Error("Enter the total variance as a number (e.g., 12345.67 or -9843.21).");
    const n = Number(String(input).trim().replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(n)) throw new Error("Enter a valid number.");
    if (Math.abs(n - expectedVariance) > 0.02) {
      throw new Error(
        `Incorrect. Make sure you: normalize region names, parse dates (quarters -> end of quarter), clean currency text, impute Expense as 37% of Revenue when blank/TBD, then sum (Revenue - Expense) for Logistics in North America with date <= ${cutoff}.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Closing the Ops Books for Orbit Commerce (offline CSV)</h2>
      <p>
        The finance team receives an “Operational Close” export with inconsistent region names, mixed date formats, and
        currency text in numeric columns.
      </p>

      <h3>What you need to do</h3>
      <ol>
        <li>Trim whitespace and standardize region names into canonical form (e.g., NA/N. America -> North America).</li>
        <li>
          Convert <code>closing_period</code> into a real date.
          <ul>
            <li>For quarter codes like <code>2024 Q3</code>, treat it as the <strong>final calendar day</strong> of that quarter.</li>
          </ul>
        </li>
        <li>Clean the numeric columns by stripping currency text and thousands separators.</li>
        <li>
          If <code>expense_reported</code> is blank or marked <code>USD TBD</code>, fill it as <strong>37%</strong> of
          the cleaned revenue value.
        </li>
        <li>Split <code>ops_notes</code> (pipe-delimited) and filter by the first component (category).</li>
        <li>
          Filter for category <strong>Logistics</strong> in region <strong>North America</strong> for records dated on or before
          <strong>${cutoff}</strong>.
        </li>
        <li>Compute total variance as <strong>Revenue − Expense</strong> summed over the filtered rows.</li>
      </ol>

      <p>
        Download the workbook export (CSV):
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the total variance (USD) for Logistics in North America up to ${cutoff}?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 12345.67 or -9843.21" required />
      <p class="text-muted">Tip: you can solve this in Excel, Python, or DuckDB—return just the final number.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


