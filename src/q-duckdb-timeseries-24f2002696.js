import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-duckdb-timeseries-24f2002696";
  const title = "DuckDB Time Series Window Functions";
  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random constraints
  const windowDays = 5 + Math.floor(random() * 5); // 5-9 days
  const thresholdPercent = 3 + Math.floor(random() * 5); // 3-7%
  
  const question = html`
    <div class="mb-3">
      <h4>Stock Price Moving Average Analysis</h4>
      <p>
        <strong>Scenario:</strong> FinanceTrack monitors daily stock prices and needs to identify 
        trading opportunities using moving averages.
      </p>
      <p>
        Write a DuckDB SQL query that analyzes stock price data with the following requirements:
      </p>
      <ol>
        <li>Calculate <strong>${windowDays}-day moving average</strong> of <code>close_price</code> for symbol 'AAPL'</li>
        <li>Identify dates where <code>close_price</code> exceeds the moving average by more than <strong>${thresholdPercent}%</strong></li>
        <li>
          Return columns (in this order):
          <ul>
            <li><code>date</code> (DATE type)</li>
            <li><code>close_price</code> (DECIMAL)</li>
            <li><code>moving_avg</code> (DECIMAL, rounded to 2 places)</li>
            <li><code>percent_above</code> (DECIMAL, rounded to 2 places)</li>
          </ul>
        </li>
        <li>Order results by <code>date</code> ascending</li>
        <li>Include comment with your email: <code>-- 24f2002696@ds.study.iitm.ac.in</code></li>
      </ol>
      <p>
        <strong>Dataset schema:</strong> <code>stock_prices(date DATE, symbol VARCHAR, close_price DECIMAL)</code>
      </p>
      <label for="${id}" class="form-label">Paste your DuckDB SQL query</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="8" 
        placeholder="-- 24f2002696@ds.study.iitm.ac.in
SELECT ..."></textarea>
      <p class="text-muted">
        We'll execute your query against a sample dataset with AAPL prices and verify the results.
      </p>
    </div>
  `;

  const answer = async (sqlQuery) => {
    if (!sqlQuery) throw new Error("SQL query is required");
    const query = sqlQuery.trim();
    
    // Check for email in comment
    if (!query.includes("24f2002696@ds.study.iitm.ac.in")) {
      throw new Error("Query must include your email in a comment: -- 24f2002696@ds.study.iitm.ac.in");
    }

    // Check for required SQL elements
    const requiredElements = [
      { pattern: /moving_avg/i, name: "moving_avg column" },
      { pattern: /percent_above/i, name: "percent_above column" },
      { pattern: /AVG.*OVER|OVER.*AVG/is, name: "window function with AVG" },
      { pattern: /ROWS\s+BETWEEN|RANGE\s+BETWEEN/i, name: "window frame specification" },
      { pattern: /ORDER\s+BY.*date/i, name: "ORDER BY date" },
      { pattern: /WHERE.*symbol.*=.*'AAPL'/i, name: "filter for AAPL symbol" },
    ];

    for (const { pattern, name } of requiredElements) {
      if (!pattern.test(query)) {
        throw new Error(`Query must include ${name}`);
      }
    }

    // Check for threshold calculation
    const thresholdPattern = new RegExp(`${thresholdPercent}|${thresholdPercent / 100}|1\\.0${thresholdPercent}`);
    if (!thresholdPattern.test(query)) {
      throw new Error(`Query must use ${thresholdPercent}% threshold`);
    }

    // Check for window size
    const windowPattern = new RegExp(`${windowDays}|${windowDays - 1}.*PRECEDING`);
    if (!windowPattern.test(query)) {
      throw new Error(`Query must use ${windowDays}-day window`);
    }

    // Basic syntax validation
    if (!query.toUpperCase().includes("SELECT")) {
      throw new Error("Query must be a SELECT statement");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}

/*
SQL solution sketch:

-- 24f2002696@ds.study.iitm.ac.in
WITH moving_averages AS (
  SELECT 
    date,
    symbol,
    close_price,
    ROUND(AVG(close_price) OVER (
      PARTITION BY symbol 
      ORDER BY date 
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ), 2) AS moving_avg
  FROM stock_prices
  WHERE symbol = 'AAPL'
)
SELECT 
  date,
  close_price,
  moving_avg,
  ROUND(((close_price - moving_avg) / moving_avg) * 100, 2) AS percent_above
FROM moving_averages
WHERE close_price > moving_avg * 1.05  -- Adjust threshold as needed
ORDER BY date ASC;
*/