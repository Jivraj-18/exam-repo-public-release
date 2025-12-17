import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const pick = (arr, random) => arr[Math.floor(random() * arr.length)];

const formatDate = (d) => d.toISOString().slice(0, 10);

export default async function({ user, weight = 1 }) {
  const id = "q-pandas-rolling-kpi";
  const title = "Pandas: Rolling KPI from daily orders";

  const random = seedrandom(`${user.email}#${id}`);

  const start = new Date("2025-10-01T00:00:00Z");
  const days = 21;

  const products = ["ebook", "coaching", "course", "notebook", "dataset"];

  const rows = [];
  for (let i = 0; i < days; i += 1) {
    const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = formatDate(date);

    const orders = 10 + Math.floor(random() * 30);

    for (let j = 0; j < orders; j += 1) {
      const sku = pick(products, random);
      const qty = 1 + Math.floor(random() * 3);
      const price = sku === "coaching" ? 999 : sku === "course" ? 499 : sku === "dataset" ? 299 : 199;
      const discount = random() < 0.2 ? 0.1 : random() < 0.08 ? 0.2 : 0;

      const revenue = qty * price * (1 - discount);

      rows.push({ date: dateStr, sku, qty, revenue: Math.round(revenue * 100) / 100 });
    }
  }

  // pick a target date inside the range with full 7-day window
  const targetIndex = 8 + Math.floor(random() * 8); // ensures >=7 days earlier
  const targetDate = formatDate(new Date(start.getTime() + targetIndex * 24 * 60 * 60 * 1000));

  // compute expected 7-day rolling revenue (inclusive) across all skus
  const byDate = new Map();
  for (const r of rows) byDate.set(r.date, (byDate.get(r.date) || 0) + r.revenue);

  const dateList = Array.from({ length: days }, (_, i) => formatDate(new Date(start.getTime() + i * 86400000)));
  const targetPos = dateList.indexOf(targetDate);
  const windowDates = dateList.slice(targetPos - 6, targetPos + 1);
  const expected = windowDates.reduce((sum, d) => sum + (byDate.get(d) || 0), 0);
  const expectedRounded = Math.round(expected * 100) / 100;

  const tsvHeader = "date\tsku\tqty\trevenue";
  const tsvRows = rows.map((r) => `${r.date}\t${r.sku}\t${r.qty}\t${r.revenue}`);
  const tsv = [tsvHeader, ...tsvRows].join("\n");

  const answer = (value) => {
    const numeric = Number(String(value).trim());
    if (!Number.isFinite(numeric)) throw new Error("Enter a number");
    if (Math.abs(numeric - expectedRounded) > 0.01) {
      throw new Error("Incorrect rolling revenue. Ensure the 7-day window is inclusive and you aggregated by date.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        Are given order-level data (tab-separated). Compute the <strong>7-day rolling revenue</strong> (inclusive)
        for all SKUs on a target date.
      </p>
      <ol>
        <li>Aggregate revenue by <code>date</code> (sum).</li>
        <li>
          For <strong>${targetDate}</strong>, compute the sum of daily revenue for the window
          <strong>${windowDates[0]}</strong> through <strong>${windowDates[windowDates.length - 1]}</strong>
          (inclusive).
        </li>
        <li>Round to 2 decimals.</li>
      </ol>
      <pre style="white-space: pre-wrap"><code>${tsv}</code></pre>
      <label for="${id}" class="form-label">7-day rolling revenue on ${targetDate}</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
