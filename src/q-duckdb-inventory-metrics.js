import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-inventory-metrics";
  const title = "DuckDB: Inventory turnover diagnostics";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randint = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const locationTarget = "SIN-2";
  const windowStart = "2024-05-10";
  const windowEnd = "2024-07-03";

  const skuCount = 22;
  const skus = Array.from({ length: skuCount }, (_, i) => `SKU-${String(1000 + i)}`);
  const perishableSkus = new Set(skus.filter((_, i) => i % 2 === 0)); // deterministic split

  const skuAttributesRows = [["sku", "category", "safety_stock", "lead_time_days"]];
  for (const sku of skus) {
    const category = perishableSkus.has(sku) ? "Perishables" : pick(["Durables", "Electronics", "Apparel"]);
    skuAttributesRows.push([sku, category, String(randint(10, 120)), String(randint(3, 28))]);
  }

  // Movement generation
  const movementHeader = [
    "movement_id",
    "sku",
    "location",
    "movement_type",
    "quantity",
    "unit_cost",
    "adjustment_direction",
    "quality_flag",
    "movement_date",
  ];
  const movementRows = [movementHeader];

  const inWindow = (dateStr) => dateStr >= windowStart && dateStr <= windowEnd;
  const dateInRange = () => {
    // May 1..Jul 20
    const base = new Date("2024-05-01T00:00:00Z").getTime();
    const d = new Date(base + randint(0, 80) * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  };

  let movementId = 1;

  /** expected metrics */
  const expected = {
    sku_count: 0,
    total_inbound: 0,
    total_outbound: 0,
    net_quantity: 0,
    avg_inbound_unit_cost: 0,
  };

  const inboundCostNumer = { value: 0 };
  const inboundCostDenom = { value: 0 };
  /** @type {Set<string>} */
  const seenSkus = new Set();

  const movementTypes = ["inbound", "outbound", "adjustment"];
  const locations = ["SIN-2", "SIN-1", "BLR-1", "DXB-3"];
  const qualityFlags = ["ok", "ok", "ok", "scrap"]; // make scrap rarer

  const totalMovements = 260;
  for (let i = 0; i < totalMovements; i++) {
    let sku = pick(skus);
    let location = pick(locations);
    let movement_type = pick(movementTypes);
    let date = dateInRange();

    // Bias towards having usable Perishables at SIN-2 in window.
    if (random() < 0.28) {
      sku = pick([...perishableSkus]);
      location = locationTarget;
      date = pick([windowStart, "2024-05-22", "2024-06-11", "2024-06-26", windowEnd]);
      movement_type = pick(["inbound", "outbound", "adjustment"]);
    }

    const quantity = randint(1, 60);
    const unit_cost = Number((8 + random() * 22).toFixed(2));
    const adjustment_direction = movement_type === "adjustment" ? pick(["add", "remove"]) : "";
    const quality_flag = pick(qualityFlags);

    movementRows.push([
      String(movementId++),
      sku,
      location,
      movement_type,
      String(quantity),
      unit_cost.toFixed(2),
      adjustment_direction,
      quality_flag,
      date,
    ]);

    // Compute expected metrics under the rules
    if (location === locationTarget && inWindow(date) && perishableSkus.has(sku)) {
      // Track SKU count across all included movements except ignored scrap adjustments?
      // Spec: "Ignore adjustment rows where quality_flag='scrap'". We'll ignore those rows entirely.
      if (!(movement_type === "adjustment" && quality_flag === "scrap")) {
        seenSkus.add(sku);
      }

      if (movement_type === "inbound") {
        expected.total_inbound += quantity;
        inboundCostNumer.value += unit_cost * quantity;
        inboundCostDenom.value += quantity;
        expected.net_quantity += quantity;
      } else if (movement_type === "outbound") {
        expected.total_outbound += quantity;
        expected.net_quantity -= quantity;
      } else if (movement_type === "adjustment") {
        if (quality_flag === "scrap") {
          // ignored
        } else {
          const sign = adjustment_direction === "remove" ? -1 : 1;
          expected.net_quantity += sign * quantity;
        }
      }
    }
  }

  // Force at least one inbound row in-window so avg cost isn't always 0.
  if (inboundCostDenom.value === 0) {
    const sku = pick([...perishableSkus]);
    const date = "2024-06-10";
    const quantity = 20;
    const unit_cost = 14.25;
    movementRows.push([
      String(movementId++),
      sku,
      locationTarget,
      "inbound",
      String(quantity),
      unit_cost.toFixed(2),
      "",
      "ok",
      date,
    ]);
    seenSkus.add(sku);
    expected.total_inbound += quantity;
    expected.net_quantity += quantity;
    inboundCostNumer.value += unit_cost * quantity;
    inboundCostDenom.value += quantity;
  }

  expected.sku_count = seenSkus.size;
  expected.avg_inbound_unit_cost = inboundCostDenom.value === 0 ? 0 : inboundCostNumer.value / inboundCostDenom.value;

  const skuCsv = skuAttributesRows.map((r) => r.join(",")).join("\n") + "\n";
  const movCsv = movementRows.map((r) => r.join(",")).join("\n") + "\n";

  const blobSku = new Blob([skuCsv], { type: "text/csv" });
  const blobMov = new Blob([movCsv], { type: "text/csv" });

  const parseCommaNumbers = (s) =>
    String(s)
      .trim()
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

  const answer = async (input) => {
    if (!input) {
      throw new Error("Enter 5 comma-separated values: sku_count,total_inbound,total_outbound,net_quantity,avg_inbound_unit_cost");
    }

    const parts = parseCommaNumbers(input);
    if (parts.length !== 5) {
      throw new Error("Expected exactly 5 comma-separated values.");
    }

    const [skuCountStr, inbStr, outStr, netStr, avgStr] = parts;
    const sku_count = Number(skuCountStr.replace(/[^\d.-]/g, ""));
    const total_inbound = Number(inbStr.replace(/[^\d.-]/g, ""));
    const total_outbound = Number(outStr.replace(/[^\d.-]/g, ""));
    const net_quantity = Number(netStr.replace(/[^\d.-]/g, ""));
    const avg_inbound_unit_cost = Number(avgStr.replace(/[^\d.-]/g, ""));

    if (![sku_count, total_inbound, total_outbound, net_quantity, avg_inbound_unit_cost].every(Number.isFinite)) {
      throw new Error("All 5 values must be numbers.");
    }

    const ok =
      sku_count === expected.sku_count
      && total_inbound === expected.total_inbound
      && total_outbound === expected.total_outbound
      && net_quantity === expected.net_quantity
      && Math.abs(avg_inbound_unit_cost - expected.avg_inbound_unit_cost) <= 0.01;

    if (!ok) {
      throw new Error(
        `Incorrect. Check: location=${locationTarget}, category=Perishables, date between ${windowStart} and ${windowEnd} (inclusive); ignore scrap adjustments; weighted avg inbound cost.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Inventory turnover review for Orbit Fulfillment (offline CSVs)</h2>
      <p>
        You have two tables: <code>inventory_movements</code> and <code>sku_attributes</code>. Use DuckDB (recommended)
        or any tool to compute one summary row.
      </p>

      <h3>Filters</h3>
      <ul>
        <li><strong>Warehouse</strong>: <code>${locationTarget}</code></li>
        <li><strong>Category</strong>: <code>Perishables</code> (via <code>sku_attributes</code>)</li>
        <li><strong>Date window</strong>: ${windowStart} through ${windowEnd} (inclusive)</li>
      </ul>

      <h3>Rules</h3>
      <ul>
        <li><strong>Total inbound</strong>: sum(quantity) where movement_type=inbound</li>
        <li><strong>Total outbound</strong>: sum(quantity) where movement_type=outbound</li>
        <li>
          <strong>Net quantity</strong>: inbound − outbound ± adjustments (adjustment_direction=remove is negative)
        </li>
        <li><strong>Ignore</strong> adjustment rows where quality_flag is <code>scrap</code></li>
        <li>
          <strong>avg_inbound_unit_cost</strong>: weighted average of inbound unit_cost by inbound quantity (0 if none)
        </li>
      </ul>

      <p>
        Download inputs:
        <button class="btn btn-sm btn-outline-primary me-2" type="button" @click=${() => download(blobMov, `${id}-inventory_movements.csv`)}>
          inventory_movements.csv
        </button>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blobSku, `${id}-sku_attributes.csv`)}>
          sku_attributes.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Enter <code>sku_count,total_inbound,total_outbound,net_quantity,avg_inbound_unit_cost</code> (comma-separated)
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 7, 820, 640, 155, 14.32" required />
      <p class="text-muted">
        Tip: In DuckDB, use <code>read_csv_auto()</code>, join on sku, filter, then aggregate.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


