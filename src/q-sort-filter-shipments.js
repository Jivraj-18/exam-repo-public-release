import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1 }) {
  const id = "q-sort-filter-shipments";
  const title = "Sort and Filter a JSON Shipment Log";

  // deterministic RNG
  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];

  // data pools
  const regions = ["North", "South", "East", "West"];
  const priorities = ["Low", "Medium", "High"];
  const carriers = ["DHL", "FedEx", "UPS", "BlueDart", "USPS"];

  // generate shipment records
  const shipments = Array.from({ length: 120 }, (_, i) => ({
    shipment_id: `S${String(i + 1).padStart(4, "0")}`,
    region: pick(regions),
    priority: pick(priorities),
    carrier: pick(carriers),
    delivery_days: Math.floor(1 + random() * 14), // 1–14 days
    cost_usd: Number((30 + random() * 220).toFixed(2)), // $30–$250
  }));

  // filtering threshold
  const maxDays = 5 + Math.floor(random() * 5); // 5–9 days

  // expected result
  const expected = shipments
    .filter((s) => s.delivery_days <= maxDays)
    .sort(
      (a, b) =>
        a.region.localeCompare(b.region) ||
        ["High", "Medium", "Low"].indexOf(a.priority) -
          ["High", "Medium", "Low"].indexOf(b.priority) ||
        a.cost_usd - b.cost_usd ||
        a.shipment_id.localeCompare(b.shipment_id),
    );

  const answer = (input) => {
    let arr;
    try {
      arr = JSON.parse(input);
    } catch {
      throw new Error("Invalid JSON");
    }

    if (!Array.isArray(arr)) throw new Error("Input must be a JSON array");
    if (arr.length !== expected.length) throw new Error("Array length mismatch");

    for (let i = 0; i < arr.length; i++) {
      const a = arr[i];
      const e = expected[i];
      if (
        a.shipment_id !== e.shipment_id ||
        a.region !== e.region ||
        a.priority !== e.priority ||
        a.carrier !== e.carrier ||
        a.delivery_days !== e.delivery_days ||
        a.cost_usd !== e.cost_usd
      ) {
        throw new Error(`Mismatch at index ${i}`);
      }
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <p>
        You are analyzing a logistics platform’s shipment records. Below is a JSON array
        containing <strong>120 shipments</strong>.
      </p>

      <ol>
        <li>
          Remove any shipment where
          <code>delivery_days &gt; ${maxDays}</code>.
        </li>
        <li>
          Sort the remaining shipments by:
          <ul>
            <li><code>region</code> (A→Z)</li>
            <li>
              then <code>priority</code> (<strong>High → Medium → Low</strong>)
            </li>
            <li>then <code>cost_usd</code> (lowest → highest)</li>
            <li>then <code>shipment_id</code> (A→Z)</li>
          </ul>
        </li>
        <li>
          Paste the final result as a <strong>single minified JSON array</strong>.
        </li>
      </ol>

      <pre style="white-space: pre-wrap"><code class="language-json">
${JSON.stringify(shipments)}
      </code></pre>

      <label for="${id}" class="form-label">
        Sorted &amp; filtered shipment JSON
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
