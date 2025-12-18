import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;

export default async function({ user, weight = 1 }) {
  const id = "q-python-dateutil-parse-tz";
  const title = "Python Data Prep (python-dateutil): Parse Mixed Timezones";
  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["Asia/Kolkata", "America/New_York", "Europe/Berlin", "UTC"];
  const targetTz = pick(regions, random);

  const start = new Date("2024-03-01T00:00:00Z");
  const end = new Date("2024-03-31T23:59:59Z");
  const randDate = () => new Date(start.getTime() + random() * (end.getTime() - start.getTime()));

  const fmt = (d) => {
    const iso = d.toISOString(); // UTC
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");

    // Mix formats: ISO Z, RFC-like, space separated, offset included.
    const offsets = ["+05:30", "-04:00", "+01:00", "+00:00"];
    const off = pick(offsets, random);
    const styles = [
      iso,
      `${y}-${m}-${day} ${hh}:${mm}:${ss}Z`,
      `${y}-${m}-${day}T${hh}:${mm}:${ss}${off}`,
      `${m}/${day}/${y} ${hh}:${mm}:${ss} ${off}`,
    ];
    return pick(styles, random);
  };

  const stores = ["BLR-01", "NYC-02", "BER-03", "SIN-04"];
  const store = pick(stores, random);

  const header = ["store_id", "sold_at_raw", "units"].join(",");
  /** @type {Array<{store_id: string, sold_at_raw: string, units: number, soldAtUtc: Date}>} */
  const rows = [];
  const count = 900 + randInt(random, 0, 200);
  for (let i = 0; i < count; i++) {
    const soldAtUtc = randDate();
    const units = randInt(random, 1, 9) * (random() < 0.04 ? -1 : 1);
    rows.push({
      store_id: pick(stores, random),
      sold_at_raw: fmt(soldAtUtc),
      units,
      soldAtUtc,
    });
  }

  // Define a local-time window in target time zone: 2024-03-15 from 09:00 to 17:59 inclusive.
  // We compute expected by converting each UTC instant to "local wall clock" using a fixed-offset approximation:
  // - UTC: +00:00
  // - Asia/Kolkata: +05:30
  // - America/New_York: -04:00 (assume DST in March)
  // - Europe/Berlin: +01:00
  // This keeps the question deterministic and avoids bundling timezone DB in JS.
  const tzOffsetMinutes = {
    "UTC": 0,
    "Asia/Kolkata": 330,
    "America/New_York": -240,
    "Europe/Berlin": 60,
  }[targetTz];

  let expectedUnits = 0;
  for (const r of rows) {
    if (r.store_id !== store) continue;
    if (r.units <= 0) continue; // drop returns/invalid
    const localMillis = r.soldAtUtc.getTime() + tzOffsetMinutes * 60 * 1000;
    const local = new Date(localMillis);
    const y = local.getUTCFullYear();
    const m = local.getUTCMonth() + 1;
    const d = local.getUTCDate();
    const hh = local.getUTCHours();
    if (y === 2024 && m === 3 && d === 15 && hh >= 9 && hh <= 17) {
      expectedUnits += r.units;
    }
  }

  const csv = [header].concat(rows.map((r) => [r.store_id, r.sold_at_raw, String(r.units)].join(","))).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const preview = csv.split("\n").slice(0, 16).join("\n");

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the summed units as an integer.");
    if (numeric !== expectedUnits) {
      throw new Error(
        `Mismatch. Steps: parse sold_at_raw (mixed formats) with python-dateutil, convert to timezone ${targetTz}, keep store_id==${store}, drop units<=0, filter local time on 2024-03-15 between 09:00 and 17:59, sum units.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Parse mixed timestamps with <code>python-dateutil</code></h2>
      <p>
        Your sales events arrive with inconsistent timestamp formats and mixed offsets. You need to normalize them and
        filter by a business-hours window in a target timezone.
      </p>

      <h3>Your task (use Python + python-dateutil)</h3>
      <ol>
        <li>Load the CSV.</li>
        <li>Parse <code>sold_at_raw</code> with <code>dateutil.parser</code> into an aware datetime.</li>
        <li>Convert timestamps to timezone <strong>${targetTz}</strong>.</li>
        <li>Keep only <code>store_id == "${store}"</code>.</li>
        <li>Drop rows where <code>units &lt;= 0</code> (returns/invalid).</li>
        <li>
          Filter to local time on <strong>2024-03-15</strong> between <strong>09:00</strong> and <strong>17:59</strong>
          (inclusive).
        </li>
        <li>Sum <code>units</code> and report the integer total.</li>
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

      <label for="${id}" class="form-label">What is the total units sold in that local-time window?</label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


