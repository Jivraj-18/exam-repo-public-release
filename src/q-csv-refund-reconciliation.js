import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function({ user, weight = 1 }) {
  const id = "q-csv-refund-reconciliation";
  const title = "CSV: E-commerce Refund Reconciliation";

  const random = seedrandom(`${user.email}#${id}`);

  const orderCount = 200;
  const rows = [["order_id", "status", "amount_paid", "refund_amount"]];
  const data = [];

  let totalNetRevenue = 0;

  for (let i = 1; i <= orderCount; i++) {
    const orderId = `ORD-${1000 + i}`;
    const amount = 50 + Math.floor(random() * 450); // $50 to $500
    
    const isRefunded = random() < 0.15;
    const isPartial = isRefunded && random() < 0.3;
    
    let status = "completed";
    let refund = 0;

    if (isRefunded) {
      status = "refunded";
      refund = isPartial ? Math.floor(amount * (0.1 + random() * 0.4)) : amount;
    }

    // Determine formatting (dirty data)
    let amountStr = random() < 0.5 ? `$${amount}.00` : `${amount}`;
    let refundStr = refund === 0 ? "" : (random() < 0.5 ? `-$${refund}` : `${refund}`);

    rows.push([orderId, status, amountStr, refundStr]);
    data.push({ amount, refund });
    
    totalNetRevenue += (amount - refund);
  }

  const csvContent = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (value) => {
    const input = Number(value.replace(/[^0-9.]/g, ""));
    if (!Number.isFinite(input)) throw new Error("Enter the net revenue as a number.");
    if (Math.abs(input - totalNetRevenue) > 1) throw new Error("Net revenue calculation is incorrect. Check how you handled the dirty currency strings or empty refund cells.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2 id="refund-recon">Finance: Net Revenue Reconciliation</h2>
      <p>
        You have been given a raw export of transactions. The <code>amount_paid</code> column contains inconsistent formatting (currency symbols), and the <code>refund_amount</code> column contains empty values for non-refunded orders.
      </p>
      <h3>Task</h3>
      <ol>
        <li>Clean the <code>amount_paid</code> and <code>refund_amount</code> columns to be pure numbers.</li>
        <li>Treat empty refund cells as 0.</li>
        <li>Calculate <strong>Net Revenue</strong>: <code>SUM(amount_paid) - SUM(refund_amount)</code>.</li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>
      <label for="${id}" class="form-label">
        What is the total Net Revenue in USD?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}