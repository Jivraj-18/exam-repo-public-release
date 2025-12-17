import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-sql-window-running-average";
  const title = "SQL: Window Functions for Moving Averages";

  const random = seedrandom(`${user.email}#${id}`);
  
  const windowDays = [3, 7, 14, 30][Math.floor(random() * 4)];
  const products = ["Electronics", "Clothing", "Food", "Books"];
  const product = products[Math.floor(random() * products.length)];

  const answer = async (response) => {
    response = response.trim().toUpperCase();
    
    const hasWindow = response.includes("OVER") && response.includes("PARTITION");
    const hasRowsBetween = response.includes("ROWS") && 
                           (response.includes("PRECEDING") || response.includes("BETWEEN"));
    const correctWindow = response.includes(`${windowDays - 1} PRECEDING`) ||
                          response.includes(`ROWS ${windowDays - 1}`);
    
    if (!hasWindow) {
      throw new Error("Must use window function with OVER clause and PARTITION BY");
    }
    
    if (!hasRowsBetween) {
      throw new Error("Must specify ROWS with PRECEDING for moving average");
    }
    
    if (!correctWindow) {
      throw new Error(`For ${windowDays}-day moving average, use ${windowDays - 1} PRECEDING (current + ${windowDays - 1} previous = ${windowDays} days)`);
    }
    
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>SQL Window Functions: Moving Average</h2>
      <p>
        You're analyzing daily sales data and need to calculate a <strong>${windowDays}-day moving average</strong> 
        for each product to identify trends.
      </p>
      
      <p><strong>Table structure:</strong></p>
      <pre><code>sales (date DATE, product_id INT, amount DECIMAL)</code></pre>
      
      <p><strong>Required output:</strong></p>
      <pre><code>date | product_id | daily_sales | moving_avg_${windowDays}d
-----|-----------|------------|------------------
2024-01-01 | 101 | 1000 | 1000
2024-01-02 | 101 | 1200 | 1100
2024-01-03 | 101 | 900  | 1033.33
...</code></pre>
      
      <p>
        The moving average should include the current day plus the previous ${windowDays - 1} days 
        (total ${windowDays} days).
      </p>
      
      <label for="${id}" class="form-label">
        Write the SQL window function clause for the ${windowDays}-day moving average:
      </label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3" required 
                placeholder="AVG(amount) OVER (...)"></textarea>
      <p class="text-muted">
        Include PARTITION BY and ROWS specification. For ${windowDays} days: current + ${windowDays - 1} preceding
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Solution
For N-day moving average (e.g., 7-day):

AVG(amount) OVER (
    PARTITION BY product_id 
    ORDER BY date 
    ROWS 6 PRECEDING  -- current + 6 previous = 7 days total
)

Or more explicit:
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
*/
