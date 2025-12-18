import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-excel-pivot-analysis";
  const title = "Excel Pivot Table: Multi-Region Sales Analysis";

  const random = seedrandom(`${user.email}#${id}`);

  // Generate MUCH MORE sales data
  const salespeople = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Iris", "Jack"];
  const regions = ["North", "South", "East", "West", "Central", "Northeast", "Southeast", "Northwest", "Southwest"];
  const products = ["Widget A", "Widget B", "Widget C", "Gadget X", "Gadget Y", "Gadget Z", "Tool P", "Tool Q", "Device M", "Device N"];
  const categories = ["Electronics", "Furniture", "Appliances", "Office", "Hardware"];
  
  const rows = [["Salesperson", "Region", "Product", "Category", "Quarter", "Sales_Amount", "Commission_Rate", "Return_Flag"]];
  
  let targetPerson = salespeople[Math.floor(random() * salespeople.length)];
  let targetRegion = regions[Math.floor(random() * regions.length)];
  let targetQuarter = "Q" + (Math.floor(random() * 4) + 1);
  
  let totalCommissionForTarget = 0;
  let countForTarget = 0;

  // Generate 5000+ sales records to make it HARD
  for (let i = 0; i < 5000; i++) {
    const person = salespeople[Math.floor(random() * salespeople.length)];
    const region = regions[Math.floor(random() * regions.length)];
    const product = products[Math.floor(random() * products.length)];
    const category = categories[Math.floor(random() * categories.length)];
    const quarter = "Q" + (Math.floor(random() * 4) + 1);
    const salesAmount = Math.round((500 + random() * 4500) * 100) / 100;
    const commissionRate = 0.03 + Math.round(random() * 0.12 * 100) / 100; // 3-15%
    const returnFlag = random() > 0.85 ? "Y" : "N"; // 15% returns
    
    rows.push([person, region, product, category, quarter, salesAmount, commissionRate, returnFlag]);
    
    // Only count non-returned items
    if (person === targetPerson && region === targetRegion && quarter === targetQuarter && returnFlag === "N") {
      totalCommissionForTarget += salesAmount * commissionRate;
      countForTarget++;
    }
  }

  const avgCommission = countForTarget > 0 ? Math.round(totalCommissionForTarget / countForTarget * 100) / 100 : 0;

  const csvContent = rows.map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the average commission amount");
    
    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the commission amount");

    const tolerance = 2; // $2 tolerance for harder calculation
    if (Math.abs(value - avgCommission) > tolerance) {
      throw new Error(
        `Incorrect. Filter for ${targetPerson} in ${targetRegion} region, ${targetQuarter}, Return_Flag='N', then calculate average of (Sales_Amount * Commission_Rate).`
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>MegaSales Corp: Multi-Dimensional Commission Analysis</h2>
      <p>
        <strong>MegaSales Corp</strong> has 10 salespeople across 9 regions with 5000+ transactions.
        Use Excel's pivot tables and advanced filtering to analyze commission data with multiple criteria.
      </p>

      <h3>Business Context</h3>
      <p>
        The finance team needs to calculate quarterly commission payments, but ONLY for sales that were NOT returned.
        With 5000+ records, manual calculation is impossible - you MUST use Excel's data analysis features.
      </p>

      <h3>Dataset Columns (5000+ rows)</h3>
      <ul>
        <li><code>Salesperson</code>: Name (10 different people)</li>
        <li><code>Region</code>: Sales region (9 regions)</li>
        <li><code>Product</code>: Product name (10 different products)</li>
        <li><code>Category</code>: Product category (5 categories)</li>
        <li><code>Quarter</code>: Q1, Q2, Q3, or Q4</li>
        <li><code>Sales_Amount</code>: Total sale in USD</li>
        <li><code>Commission_Rate</code>: Commission % (0.03 to 0.15)</li>
        <li><code>Return_Flag</code>: Y if returned, N if kept</li>
      </ul>

      <h3>Your Task (MULTI-STEP)</h3>
      <ol>
        <li>Download the CSV (5000+ rows) and open in Excel</li>
        <li>Create calculated column: <code>Commission = Sales_Amount × Commission_Rate</code></li>
        <li>Filter for:
          <ul>
            <li>Salesperson = <strong>${targetPerson}</strong></li>
            <li>Region = <strong>${targetRegion}</strong></li>
            <li>Quarter = <strong>${targetQuarter}</strong></li>
            <li>Return_Flag = <strong>"N"</strong> (not returned!)</li>
          </ul>
        </li>
        <li>Calculate <strong>AVERAGE commission</strong> for matching rows</li>
        <li>Submit the result (rounded to 2 decimal places)</li>
      </ol>

      <p>
        Download the sales data (5000+ records):
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <h3>Excel Tips</h3>
      <ul>
        <li>Use <strong>AutoFilter</strong> (Data → Filter) for multiple criteria</li>
        <li>Or use <strong>AVERAGEIFS</strong> formula for conditional average</li>
        <li>Or create a <strong>Pivot Table</strong> with slicers</li>
        <li>Watch out for the Return_Flag - don't count returned items!</li>
      </ul>

      <label for="${id}" class="form-label">
        Average commission for ${targetPerson} in ${targetRegion} (${targetQuarter}, non-returned only)?
      </label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="e.g., 234.56" 
        required 
      />
      <p class="text-muted">
        Format: dollar amount without $ (e.g., 234.56). Must filter by ALL criteria including Return_Flag!
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}