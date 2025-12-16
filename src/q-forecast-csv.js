import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-forecast-csv";
  const title = "Forecast next week (CSV upload)";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate 30 days of daily data with trend + seasonality + noise
  const days = 30;
  const now = new Date();
  const base = 100 + random() * 20;
  const series = [];
  for (let i = 0; i < days; i++) {
    const trend = i * (0.2 + random() * 0.05);
    const seasonal = 5 * Math.sin((i / 7) * Math.PI * 2);
    const noise = random() * 4 - 2;
    const val = Number((base + trend + seasonal + noise).toFixed(2));
    const date = new Date(now.getTime() - (days - i) * 24 * 60 * 60 * 1000);
    series.push({ date: date.toISOString().slice(0, 10), value: val });
  }

  // True future next 7 days (we'll compute deterministically)
  const future = [];
  for (let i = 0; i < 7; i++) {
    const t = days + i;
    const trend = t * (0.2 + random() * 0.05);
    const seasonal = 5 * Math.sin((t / 7) * Math.PI * 2);
    const noise = random() * 4 - 2;
    const val = Number((base + trend + seasonal + noise).toFixed(2));
    const date = new Date(now.getTime() + (i + 1) * 24 * 60 * 60 * 1000);
    future.push({ date: date.toISOString().slice(0, 10), value: val });
  }

  const csv = ["date,value", ...series.map((r) => `${r.date},${r.value}`)].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const question = html`
    <div class="mb-3">
      <p><strong>Case Study: Short-term forecasting</strong></p>
      <p>
        Here is 30 days of daily observations. Produce a CSV file with two columns <code>date,forecast</code> containing
        forecasts for the <strong>next 7 days</strong> (one row per date, in ISO format). Upload your CSV to be
        evaluated. Your forecast is accepted if the Mean Absolute Percentage Error (MAPE) on the 7 days is less than
        <code>15%</code> (<code>0.15</code>).
      </p>
      <p>
        <a download="series.csv" href="${url}" class="btn btn-outline-primary">Download the historical series</a>
      </p>
      <label for="${id}" class="form-label">Upload your forecast CSV (date,forecast)</label>
      <input class="form-control" id="${id}" name="${id}" type="file" accept="text/csv" />
      <p class="text-muted">CSV example: <code>2025-01-01,123.45</code></p>
    </div>
  `;

  const mape = (actuals, preds) => {
    let sum = 0;
    for (let i = 0; i < actuals.length; i++) {
      const a = actuals[i];
      const p = preds[i];
      if (a === 0) return Infinity;
      sum += Math.abs((a - p) / a);
    }
    return sum / actuals.length;
  };

  const answer = async (file) => {
    if (!file || !file.size) throw new Error("No file uploaded");
    const text = await file.text();
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error("CSV must have at least one forecast row");
    const header = lines[0].split(",").map((s) => s.trim().toLowerCase());
    const dateIdx = header.indexOf("date");
    const fcIdx = header.indexOf("forecast");
    if (dateIdx === -1 || fcIdx === -1) throw new Error("CSV must have `date` and `forecast` headers");

    const preds = [];
    const actuals = future.map((d) => d.value);
    const seenDates = lines.slice(1).map((l) => l.split(",")[dateIdx].trim());
    // Ensure dates match the expected next 7 dates
    const expectedDates = future.map((d) => d.date);
    for (const d of expectedDates) if (!seenDates.includes(d)) throw new Error(`Missing forecast for date ${d}`);

    // Build preds aligned to expectedDates
    for (const d of expectedDates) {
      const line = lines.slice(1).find((l) => l.split(",")[dateIdx].trim() === d);
      const val = Number(line.split(",")[fcIdx]);
      if (!Number.isFinite(val)) throw new Error(`Invalid forecast value for ${d}`);
      preds.push(val);
    }

    const score = mape(actuals, preds);
    if (score > 0.15) throw new Error(`MAPE too high: ${Number(score.toFixed(3))} (threshold 0.15)`);
    return true;
  };

  return { id, title, weight, question, answer };
}
