import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-python-dask-large-csv-filter-impute";
  const title = "Python Data Prep (dask): Filter + Impute at Scale";
  const random = seedrandom(`${user.email}#${id}`);

  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;
  const countries = ["IN", "US", "DE", "BR", "SG", "AU"];
  const devices = ["mobile", "desktop", "tablet"];
  const country = pick(countries, random);
  const device = pick(devices, random);
  const minPageviews = randInt(3, 8);

  const header = ["session_id", "user_id", "country", "device", "pageviews", "spend_usd"];
  const lines = [header.join(",")];

  let expected = 0;
  const rows = 16000 + randInt(0, 4000);
  for (let i = 0; i < rows; i++) {
    const sid = `S${String(i + 1).padStart(6, "0")}`;
    const uid = `U${String(randInt(1, 5000)).padStart(5, "0")}`;
    const c = pick(countries, random);
    const d = pick(devices, random);
    const pageviews = randInt(1, 15);
    const spend =
      random() < 0.12
        ? "" // missing
        : (Math.max(0, (random() ** 2) * 120 + (d === "mobile" ? 5 : 0)) + (random() < 0.03 ? -20 : 0)).toFixed(2);

    lines.push([sid, uid, c, d, String(pageviews), spend].join(","));

    // Expected: treat missing as 0; drop negative spends; filter country/device/pageviews; sum spend.
    if (c === country && d === device && pageviews >= minPageviews) {
      const s = spend === "" ? 0 : Number(spend);
      if (Number.isFinite(s) && s > 0) expected += s;
    }
  }
  expected = Math.round(expected * 100) / 100;

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const preview = lines.slice(0, 16).join("\n");

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d.-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the total spend as a number.");
    if (Math.abs(numeric - expected) > 0.02) {
      throw new Error(
        `Mismatch. Rules: filter country==${country}, device==${device}, pageviews>=${minPageviews}; treat missing spend as 0; ignore non-positive spends; sum spend_usd and round to 2 decimals.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Large CSV cleanup with <code>dask</code></h2>
      <p>
        Your clickstream pipeline writes a big CSV. The spend column is sparse and sometimes contains invalid negative
        values. You need a scalable workflow (this is where <code>dask.dataframe</code> helps).
      </p>

      <h3>Your task (use Python + dask)</h3>
      <ol>
        <li>Load the CSV with <code>dask.dataframe.read_csv</code>.</li>
        <li>Coerce <code>spend_usd</code> to numeric; treat missing as 0.</li>
        <li>Ignore rows where spend is &le; 0.</li>
        <li>
          Filter to <code>country == "${country}"</code>, <code>device == "${device}"</code>, and
          <code>pageviews &gt;= ${minPageviews}</code>.
        </li>
        <li>Compute the total spend and round to 2 decimals.</li>
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
        What is the total cleaned spend (USD) for <strong>${country}</strong> / <strong>${device}</strong> sessions with
        at least <strong>${minPageviews}</strong> pageviews?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Round to 2 decimals.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


