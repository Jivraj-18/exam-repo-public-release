import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-sqlite-sales-aggregation";
  const title = "SQLite Sales Aggregation";

  const random = seedrandom(`${user.email}#${id}`);

  const regions = ["North", "South", "East", "West"];
  const rows = [["order_id", "region", "amount_usd"]];

  let expectedTotal = 0;

  for (let i = 1; i <= 80; i++) {
    const region = regions[Math.floor(random() * regions.length)];
    const amount = Math.round((50 + random() * 200) * 100) / 100;

    rows.push([`O${String(i).padStart(3, "0")}`, region, amount.toFixed(2)]);

    if (region === "North") expectedTotal += amount;
  }

  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });

  const answer = async (value) => {
    const num = Number(value.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(num)) throw new Error("Enter a numeric total.");
    if (Math.abs(num - expectedTotal) > 1) {
      throw new Error("Total sales for North region is incorrect.");
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Regional Sales Query</h2>
      <p>
        A sales database tracks orders across regions.
        You need to analyze regional performance using SQL.
      </p>

      <ol>
        <li>Load the CSV into SQLite.</li>
        <li>Create a table with appropriate columns.</li>
        <li>
          Write a SQL query to compute the <strong>total sales</strong> for the
          <code>North</code> region.
        </li>
      </ol>

      <p>
        Download the sales data:
        <button class="btn btn-sm btn-outline-primary"
          @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the total sales amount (USD) for the North region?
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">
        You may use <code>sqlite3</code>, <code>duckdb</code>, or any SQL client.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
