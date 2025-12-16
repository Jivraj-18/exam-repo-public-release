import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-biz-tiered-pricing";
  const title = "Business Logic: Tiered Usage Billing";

  const random = seedrandom(`${user.email}#${id}`);

  const rows = [["customer_id", "units_consumed"]];
  const customers = [];
  
  // Define Tiers
  // Tier 1: 0-100 units @ $0.50
  // Tier 2: 101-500 units @ $0.40
  // Tier 3: 501+ units @ $0.30
  
  let totalBilledAmount = 0;

  for (let i = 1; i <= 50; i++) {
    const units = Math.floor(random() * 800); // 0 to 800 units
    customers.push(units);
    rows.push([`CUST-${i}`, units]);

    let bill = 0;
    let remainder = units;

    // Tier 1 calculation
    const t1 = Math.min(remainder, 100);
    bill += t1 * 0.50;
    remainder -= t1;

    // Tier 2 calculation
    if (remainder > 0) {
        const t2 = Math.min(remainder, 400); // 500 - 100 = 400 width
        bill += t2 * 0.40;
        remainder -= t2;
    }

    // Tier 3 calculation
    if (remainder > 0) {
        bill += remainder * 0.30;
    }
    
    totalBilledAmount += bill;
  }

  const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  const answer = async (value) => {
    const input = Number(value.replace(/[^0-9.]/g, ""));
    // Allow small float error
    if (Math.abs(input - totalBilledAmount) > 0.1) throw new Error("Incorrect total billing amount. Check your tier logic.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="tiered-billing">Finance: Tiered Usage Calculation</h2>
      <p>
        Calculate the total revenue from customer usage based on a progressive pricing model.
      </p>
      <ul>
        <li>First 100 units: $0.50 / unit</li>
        <li>Next 400 units (101-500): $0.40 / unit</li>
        <li>Any units above 500: $0.30 / unit</li>
      </ul>
      <h3>Task</h3>
      <ol>
        <li>Download the usage data.</li>
        <li>Calculate the bill for each customer using the tiered logic above.</li>
        <li>Sum the bills to get the Total Billed Amount.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        What is the Total Billed Amount?
      </label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}