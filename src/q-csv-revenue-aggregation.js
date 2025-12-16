import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-csv-revenue-aggregation";
  const title = "CSV Revenue Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["Basic", "Pro", "Enterprise"];
  const rows = [["customer_id", "plan", "monthly_revenue_usd"]];

  let expectedAverage = 0;
  let count = 0;

  for (let i = 1; i <= 120; i++) {
    const plan = categories[Math.floor(random() * categories.length)];
    const revenue =
      plan === "Basic"
        ? 20 + random() * 10
        : plan === "Pro"
          ? 50 + random() * 20
          : 120 + random() * 40;

    rows.push([`C${String(i).padStart(4, "0")}`, plan, revenue.toFixed(2)]);

    if (plan === "Pro") {
      expectedAverage += revenue;
      count++;
    }
  }

  expectedAverage /= count;

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const answer = async (value) => {
    const num = Number(value.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(num)) throw new Error("Enter a numeric average.");
    if (Math.abs(num - expectedAverage) > 0.5) {
      throw new Error("Average revenue for Pro plan is incorrect.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SaaS Revenue Analysis</h2>
      <p>
        You are given a CSV file containing monthly revenue data for a SaaS
        product across different subscription plans.
      </p>

      <ol>
        <li>Load the CSV into a data analysis tool (Excel, Pandas, etc.).</li>
        <li>Filter rows where <code>plan === "Pro"</code>.</li>
        <li>Compute the average monthly revenue for Pro customers.</li>
      </ol>

      <p>
        Download the dataset:
        <button class="btn btn-sm btn-outline-primary"
          @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the average monthly revenue (USD) for the Pro plan?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Round to two decimal places.</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
