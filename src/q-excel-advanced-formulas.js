import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-excel-advanced-formulas";
  const title = "Excel: Multi-Criteria Analysis with Advanced Functions";

  const random = seedrandom(`${user.email}#${id}`);

  const categories = ["Electronics", "Apparel", "Home", "Sports", "Books"];
  const statuses = ["Completed", "Pending", "Cancelled"];
  const months = ["January", "February", "March", "April", "May", "June"];

  // Randomly select target filters
  const targetCategory = categories[Math.floor(random() * categories.length)];
  const targetStatus = statuses[Math.floor(random() * statuses.length)];
  const targetMonthIdx = Math.floor(random() * months.length);
  const targetMonth = months[targetMonthIdx];
  const targetMonthNum = targetMonthIdx + 1; // 1-based month number

  // Generate 15-20 rows of data
  const rowCount = 15 + Math.floor(random() * 6);
  const rows = [["Date", "Category", "Amount", "Status"]];

  let expectedSum = 0;

  for (let i = 0; i < rowCount; i++) {
    const category = categories[Math.floor(random() * categories.length)];
    const status = statuses[Math.floor(random() * statuses.length)];
    const amount = Math.round((50 + random() * 450) * 100) / 100; // 50-500 with 2 decimals
    
    // Generate date in target month or other months
    const monthNum = Math.floor(random() * 6) + 1; // 1-6 for Jan-Jun
    const day = Math.floor(random() * 28) + 1; // 1-28 to avoid month-end issues
    const dateStr = `${monthNum}/${day}/2024`;

    rows.push([dateStr, category, amount.toFixed(2), status]);

    // Calculate expected sum
    if (category === targetCategory && status === targetStatus && monthNum === targetMonthNum) {
      expectedSum += amount;
    }
  }

  expectedSum = Math.round(expectedSum * 100) / 100;

  // Generate CSV content
  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = (userInput) => {
    const userValue = parseFloat(userInput);
    if (isNaN(userValue)) {
      throw new Error("Please enter a valid numeric value.");
    }
    if (Math.abs(userValue - expectedSum) > 0.01) {
      throw new Error(
        `Incorrect sum. Make sure you are filtering by Category='${targetCategory}', Status='${targetStatus}', and dates in ${targetMonth} 2024. Try using SUMIFS with multiple criteria.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>E-Commerce Multi-Criteria Sales Analysis</h2>
      <p>
        <strong>DataMart Analytics</strong> manages sales data for an e-commerce platform. The finance team needs to
        calculate sales totals based on multiple criteria for quarterly reports and category performance analysis.
      </p>
      <p>
        You have a dataset containing transaction records with dates, product categories, amounts, and order statuses.
        Your task is to use Excel's advanced functions to calculate a specific metric.
      </p>

      <h3>Dataset Preview</h3>
      <div style="max-height: 300px; overflow-y: auto; border: 1px solid #ddd; margin-bottom: 10px;">
        <table class="table table-sm table-striped">
          <thead style="position: sticky; top: 0; background-color: white;">
            <tr>
              ${rows[0].map((header) => html`<th>${header}</th>`)}
            </tr>
          </thead>
          <tbody>
            ${rows.slice(1).map((row) => html`<tr>${row.map((cell) => html`<td>${cell}</td>`)}</tr>`)}
          </tbody>
        </table>
      </div>

      <p>
        Download the data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <h3>Your Task</h3>
      <p>
        Calculate the <strong>sum of amounts</strong> for transactions that meet <strong>all</strong> of these
        criteria:
      </p>
      <ul>
        <li>Category = <strong>${targetCategory}</strong></li>
        <li>Status = <strong>${targetStatus}</strong></li>
        <li>Date falls in <strong>${targetMonth} 2024</strong> (month ${targetMonthNum})</li>
      </ul>
      <p>
        <strong>Hint:</strong> Use Excel's <code>SUMIFS</code> function which allows multiple criteria. The syntax is:
        <code>SUMIFS(sum_range, criteria_range1, criterion1, criteria_range2, criterion2, ...)</code>
      </p>
      <p>For date filtering, you can use comparison operators like <code>&gt;=DATE(2024,${targetMonthNum},1)</code></p>

      <label for="${id}" class="form-label"> What is the total sum? (Enter numeric value with up to 2 decimals) </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="text"
        required
        placeholder="e.g., 1234.56"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
