import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-inventory-audit";
  const title = "JSON: Warehouse Nested Inventory Audit";

  const random = seedrandom(`${user.email}#${id}`);

  const zones = ["Zone-A", "Zone-B", "Zone-C"];
  const conditions = ["new", "open-box", "damaged", "refurbished"];
  
  const warehouse = {
    warehouse_id: "WH-55",
    audit_date: new Date().toISOString().split('T')[0],
    zones: []
  };

  let totalDamagedValue = 0;

  // Generate nested structure
  for (const zoneName of zones) {
    const zone = { id: zoneName, shelves: [] };
    const shelfCount = 3 + Math.floor(random() * 3);
    
    for (let s = 1; s <= shelfCount; s++) {
      const shelf = { shelf_id: `${zoneName}-S${s}`, items: [] };
      const itemCount = 5 + Math.floor(random() * 10);
      
      for (let i = 0; i < itemCount; i++) {
        const condition = pick(conditions, random);
        const price = 10 + Math.floor(random() * 190);
        const qty = 1 + Math.floor(random() * 5);
        
        shelf.items.push({
          sku: `ITEM-${Math.floor(random() * 9999)}`,
          condition: condition,
          unit_price: price,
          quantity: qty
        });

        if (condition === "damaged") {
          totalDamagedValue += (price * qty);
        }
      }
      zone.shelves.push(shelf);
    }
    warehouse.zones.push(zone);
  }

  const blob = new Blob([JSON.stringify(warehouse, null, 2)], { type: "application/json" });

  const answer = async (value) => {
    const input = Number(value.replace(/[^0-9.]/g, ""));
    if (input !== totalDamagedValue) throw new Error("Incorrect total value. Did you sum (price * quantity) for all nested 'damaged' items?");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="inventory-audit">Operations: Damaged Inventory Audit</h2>
      <p>
        We need to write-off damaged stock. The inventory system exports a deeply nested JSON file: Warehouse > Zones > Shelves > Items.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Parse the JSON file.</li>
        <li>Traverse all zones and shelves.</li>
        <li>Find all items where <code>condition</code> is <strong>"damaged"</strong>.</li>
        <li>Calculate the total value: sum of <code>unit_price * quantity</code> for these items.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>
      <label for="${id}" class="form-label">
        What is the total value of damaged inventory?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}