import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

const parseWeightToGrams = (raw) => {
  const s = String(raw ?? "").trim().toLowerCase();
  if (!s) return null;
  // Examples: "850g", "0.85 kg", "1.2kg", "  500 g "
  const m = s.match(/(-?\d+(\.\d+)?)\s*(kg|g)\b/);
  if (!m) return null;
  const value = Number(m[1]);
  if (!Number.isFinite(value)) return null;
  const unit = m[3];
  const grams = unit === "kg" ? value * 1000 : value;
  return grams > 0 ? grams : null;
};

export default async function({ user, weight = 1 }) {
  const id = "q-python-pyarrow-csv-cast-aggregate";
  const title = "Python Data Prep (pyarrow): Typed CSV + Aggregation";
  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["Glassware", "Electronics", "Cosmetics", "Books", "Hardware"];
  const category = pick(categories, random);
  const randInt = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  /** @type {Array<{sku: string, category: string, fragile: string, weight: string, warehouse: string}>} */
  const rows = [];
  const warehouses = ["BLR", "DEL", "MUM", "HYD"];
  const n = 900;
  for (let i = 0; i < n; i++) {
    const cat = pick(categories, random);
    const fragile = random() < (cat === "Glassware" ? 0.85 : 0.18) ? "Y" : "N";
    const baseG = cat === "Books" ? 180 + random() * 920 : 40 + random() * 2200;
    const asKg = random() < 0.25;
    const weightValue = asKg ? (baseG / 1000).toFixed(2) : Math.round(baseG).toString();
    const weightUnit = asKg ? "kg" : "g";
    const spacer = random() < 0.3 ? " " : "";
    const weight = `${weightValue}${spacer}${weightUnit}`;
    rows.push({
      sku: `SKU-${String(randInt(1, 520)).padStart(4, "0")}`,
      category: cat,
      fragile,
      weight,
      warehouse: pick(warehouses, random),
    });
  }

  const header = ["sku", "category", "fragile", "weight", "warehouse"];
  const csv = [header.join(",")]
    .concat(rows.map((r) => [r.sku, r.category, r.fragile, r.weight, r.warehouse].join(",")))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  // Expected: filter category==X and fragile==Y; parse weight into grams; sum grams; round to nearest gram (int).
  let expectedGrams = 0;
  for (const r of rows) {
    if (r.category !== category) continue;
    if (r.fragile !== "Y") continue;
    const grams = parseWeightToGrams(r.weight);
    if (grams) expectedGrams += grams;
  }
  expectedGrams = Math.round(expectedGrams);

  const answer = async (value) => {
    if (typeof value === "string") value = value.replace(/[^\d.-]/g, "");
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter the total weight (grams) as a number.");
    if (Math.abs(numeric - expectedGrams) > 1) {
      throw new Error(
        `Mismatch. Filter to category=="${category}" and fragile=="Y", parse weight into grams (kg→g), sum, and round to the nearest gram.`,
      );
    }
    return true;
  };

  const preview = csv.split("\n").slice(0, 16).join("\n");

  const question = html`
    <div class="mb-3">
      <h2>Type a messy CSV using <code>pyarrow</code></h2>
      <p>
        You ingest warehouse item data where weights are mixed units (<code>g</code>/<code>kg</code>) embedded in strings.
        You need a fast columnar read and a typed aggregation.
      </p>

      <h3>Your task (use Python + pyarrow)</h3>
      <ol>
        <li>Load the CSV with <code>pyarrow.csv</code>.</li>
        <li>Filter rows where <code>category == "${category}"</code> and <code>fragile == "Y"</code>.</li>
        <li>Parse <code>weight</code> into grams (e.g., <code>0.85 kg → 850 g</code>).</li>
        <li>Sum the grams and round to the nearest gram.</li>
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
        What is the total weight (grams) of <strong>fragile</strong> items in category <strong>${category}</strong>?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}


