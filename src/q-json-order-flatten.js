import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-json-order-flatten";
  const title = "JSON: Flatten nested customer orders";

  const random = seedrandom(`${user.email}#${id}`);
  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randint = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const regions = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"];
  const channels = ["Direct", "Reseller", "Marketplace"];
  const categories = ["Security", "Compute", "Storage", "Networking", "Analytics"];
  const products = {
    Security: ["WAF", "EDR", "CASB", "SIEM", "ZeroTrust"],
    Compute: ["VM", "K8s", "Functions", "Batch"],
    Storage: ["ObjectStore", "BlockStore", "Archive"],
    Networking: ["VPC", "VPN", "CDN"],
    Analytics: ["BI", "Warehouse", "ETL"],
  };

  const startBase = new Date("2024-07-01T00:00:00Z");
  const start = new Date(startBase.getTime() + randint(0, 45) * 24 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + randint(25, 55) * 24 * 60 * 60 * 1000);

  const isoDate = (d) => d.toISOString().slice(0, 10);
  const startStr = isoDate(start);
  const endStr = isoDate(end);

  /** @type {string[]} */
  const lines = [];
  let expectedQty = 0;

  const customerCount = 60;

  for (let i = 0; i < customerCount; i++) {
    const customer = {
      customer_id: `C${String(1000 + i).padStart(4, "0")}`,
      region: pick(regions),
      tier: pick(["SMB", "Mid-Market", "Enterprise"]),
      orders: [],
    };

    const orderCount = randint(0, 6);
    for (let j = 0; j < orderCount; j++) {
      const d = new Date(startBase.getTime() + randint(0, 120) * 24 * 60 * 60 * 1000);
      const channel = pick(channels);
      const items = [];
      const itemCount = randint(1, 5);
      for (let k = 0; k < itemCount; k++) {
        const category = pick(categories);
        const sku = pick(products[category]);
        const quantity = randint(1, 9);
        items.push({ category, sku, quantity });
      }

      const order = {
        order_id: `${customer.customer_id}-O${String(j + 1).padStart(2, "0")}`,
        order_date: isoDate(d),
        channel,
        items,
      };

      customer.orders.push(order);

      const inWindow = order.order_date >= startStr && order.order_date <= endStr;
      if (customer.region === "Asia Pacific" && channel === "Direct" && inWindow) {
        for (const it of items) {
          if (it.category === "Security") expectedQty += it.quantity;
        }
      }
    }

    lines.push(JSON.stringify(customer));
  }

  // Ensure there is something to count.
  if (expectedQty === 0) {
    const forced = {
      customer_id: "C9999",
      region: "Asia Pacific",
      tier: "Enterprise",
      orders: [
        {
          order_id: "C9999-O01",
          order_date: startStr,
          channel: "Direct",
          items: [
            { category: "Security", sku: "WAF", quantity: 7 },
            { category: "Compute", sku: "VM", quantity: 2 },
          ],
        },
      ],
    };
    lines.push(JSON.stringify(forced));
    expectedQty = 7;
  }

  const blob = new Blob([lines.join("\n") + "\n"], { type: "application/jsonl" });

  const answer = async (input) => {
    if (!input) throw new Error("Enter the total quantity as a whole number.");
    const n = Number(String(input).trim().replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(n) || !Number.isInteger(n)) throw new Error("Enter a whole number (integer quantity).");
    if (n !== expectedQty) {
      throw new Error(
        `Incorrect. Filter to region=Asia Pacific, channel=Direct, category=Security, order_date between ${startStr} and ${endStr} (inclusive), then sum quantity.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Customer order flattening for Slingshot Cloud (offline JSONL)</h2>
      <p>
        Each line in the JSONL export contains a customer record with nested <code>orders</code> and <code>items</code>.
        Your job is to flatten it (explode orders and items) and compute a product analytics metric.
      </p>

      <h3>Goal</h3>
      <p>
        Compute the <strong>total quantity</strong> of <strong>Security</strong> items sold through the
        <strong>Direct</strong> channel to customers in <strong>Asia Pacific</strong> between
        <strong>${startStr}</strong> and <strong>${endStr}</strong> (inclusive).
      </p>

      <p>
        Download the customer order feed:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.jsonl`)}>
          ${id}.jsonl
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the total quantity matching the criteria above?
      </label>
      <input class="form-control" id="${id}" name="${id}" inputmode="numeric" required />
      <p class="text-muted">
        Recommended workflow: stream JSONL, explode <code>orders[]</code>, explode <code>items[]</code>, filter, sum.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


