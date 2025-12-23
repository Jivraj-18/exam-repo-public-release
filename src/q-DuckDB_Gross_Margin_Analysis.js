export async function question4({ user, weight = 1 }) {
  const id = "q-duckdb-margin-category";
  const title = "DuckDB Post-Launch Category Margins";
  const answer = "AI Automation";
  const question = html`
    <div class="mb-3">
      <p>
        HelioStack relaunched its product portfolio on 2024-05-15. Using DuckDB
        to join sku_master and shipments tables, filter shipments from the launch
        date forward and calculate gross margin by category
        (SUM(revenue) - SUM(cost)) / SUM(revenue). Which category achieved the
        <strong>highest gross margin</strong> after the launch?
      </p>
      <label for="${id}" class="form-label">Category Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. AI Automation" />
    </div>
  `;
  return { id, title, weight, question, answer };
}