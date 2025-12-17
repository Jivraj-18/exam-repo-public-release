import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

/* ---------- Inline download utility ---------- */
function download(blob, filename) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-revenue-retention";
  const title = "Python: Revenue Retention Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  const signupMonths = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05"];
  const firstCohort = signupMonths[0];

  const totalCustomers = 170 + Math.floor(random() * 40);
  const monthOffsets = [0, 1, 2, 3, 4, 5];

  const rows = [["customer_id", "signup_month", "month_offset", "active_flag", "subscription_revenue_usd"]];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  let rev0 = 0;
  let rev3 = 0;

  for (let i = 1; i <= totalCustomers; i++) {
    const signupIndex = Math.floor(random() * signupMonths.length);
    const signupMonth = signupMonths[signupIndex];
    const customerId = `C${String(i).padStart(4, "0")}`;
    const baseRevenue = 75 + random() * 125;

    for (const offset of monthOffsets) {
      const active = random() < 0.9 - offset * 0.08 ? 1 : 0;
      const revenue = active ? Math.round(baseRevenue * (1 + randomNormal() * 0.15) * 100) / 100 : 0;

      rows.push([customerId, signupMonth, offset, active, revenue.toFixed(2)]);

      if (signupMonth === firstCohort) {
        if (offset === 0) rev0 += revenue;
        if (offset === 3) rev3 += revenue;
      }
    }
  }

  const revenueRetention = rev3 / rev0;
  const blob = new Blob([rows.map(r => r.join(",")).join("\n")], { type: "text/csv" });

  const answer = async (response) => {
    let v = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (response.includes("%")) v /= 100;
    if (Math.abs(v - revenueRetention) > 0.01)
      throw new Error("Revenue retention miscalculated.");
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>StreamLuxe: Revenue Retention Diagnostics</h2>

      <p>Compute <strong>revenue retention</strong> at Month 3 for the earliest cohort.</p>

      <button class="btn btn-sm btn-outline-primary"
        @click=${() => download(blob, `${id}.csv`)}>
        Download CSV
      </button>

      <label class="form-label mt-2">
        Revenue retention for cohort ${firstCohort}
      </label>

      <input class="form-control" id="${id}" placeholder="e.g. 0.71 or 71%" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
