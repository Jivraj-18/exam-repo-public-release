import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

export default async function({ user, weight = 1 }) {
  const id = "q-python-numpy-clip-mad";
  const title = "Python Data Prep (numpy): Robust Outlier Handling (Median/MAD)";
  const random = seedrandom(`${user.email}#${id}`);

  // Generate 1-D signal with outliers and missing values
  const n = 650 + randInt(random, 0, 200);
  /** @type {Array<string>} */
  const lines = ["reading"];

  /** @type {number[]} */
  const values = [];

  for (let i = 0; i < n; i++) {
    const base = 50 + (random() - 0.5) * 8; // around 50
    const noise = (random() - 0.5) * 6;
    let v = base + noise;

    // occasional outliers
    if (random() < 0.03) v += (random() < 0.5 ? -1 : 1) * (40 + random() * 120);

    // occasional missing
    const isMissing = random() < 0.06;
    if (isMissing) {
      lines.push("");
      continue;
    }

    const str = random() < 0.2 ? v.toFixed(3) : v.toFixed(2);
    lines.push(str);
    values.push(Number(str));
  }

  const csv = lines.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  // Expected: drop missing; compute median and MAD; robust z = 0.6745*(x-med)/MAD; keep |z|<=3.5; mean of kept values.
  const sorted = [...values].sort((a, b) => a - b);
  const median = (() => {
    const m = sorted.length;
    if (!m) return 0;
    const mid = Math.floor(m / 2);
    return m % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  })();
  const absDevs = values.map((v) => Math.abs(v - median)).sort((a, b) => a - b);
  const mad = (() => {
    const m = absDevs.length;
    if (!m) return 0;
    const mid = Math.floor(m / 2);
    return m % 2 ? absDevs[mid] : (absDevs[mid - 1] + absDevs[mid]) / 2;
  })();

  let keptSum = 0;
  let keptCount = 0;
  for (const v of values) {
    // Avoid divide by 0: if MAD==0, treat all as kept (degenerate distribution).
    const z = mad === 0 ? 0 : (0.6745 * (v - median)) / mad;
    if (Math.abs(z) <= 3.5) {
      keptSum += v;
      keptCount += 1;
    }
  }
  const expectedMean = keptCount ? Math.round((keptSum / keptCount) * 1000) / 1000 : 0;

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d.-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the robust mean as a number.");
    if (Math.abs(numeric - expectedMean) > 0.002) {
      throw new Error(
        "Mismatch. Steps: drop missing, compute median and MAD, compute robust z-score z = 0.6745*(x-median)/MAD, keep |z|<=3.5, then compute mean. Round to 3 decimals.",
      );
    }
    return true;
  };

  const preview = csv.split("\n").slice(0, 20).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Robust outlier handling with <code>numpy</code></h2>
      <p>
        A sensor feed has missing readings and extreme spikes. You want a robust cleaning rule that doesn’t get skewed
        by outliers.
      </p>

      <h3>Your task (use Python + numpy)</h3>
      <ol>
        <li>Load the CSV (single column <code>reading</code>).</li>
        <li>Drop missing/blank readings.</li>
        <li>Compute the median and MAD (median absolute deviation).</li>
        <li>
          Compute robust z-score \(z = 0.6745 * (x - median) / MAD\) and keep rows where \(|z| \\le 3.5\).
        </li>
        <li>Compute the mean of the kept readings and round to <strong>3 decimals</strong>.</li>
      </ol>

      <p>
        Download:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <details class="mb-3">
        <summary>Preview (first 19 lines)</summary>
        <pre style="white-space: pre-wrap"><code class="language-csv">${preview}</code></pre>
      </details>

      <label for="${id}" class="form-label">What is the robust mean after MAD filtering?</label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Round to 3 decimals.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


