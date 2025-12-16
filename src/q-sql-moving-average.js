import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default function ({ user, weight = 1 }) {
  const questionId = "sql-moving-average";
  
  const sampleData = `date,revenue
2024-01-01,1000
2024-01-02,1500
2024-01-03,1200
2024-01-04,1800
2024-01-05,1600
2024-01-06,2000
2024-01-07,1900`;
  
  return {
    id: questionId,
    weight,
    question: html`
      <h3>Calculate 3-Day Moving Average</h3>
      <p>
        Given daily revenue data, calculate a 3-day moving average using SQL window functions.
      </p>
      
      <h4>Input Data (daily_revenue):</h4>
      <pre><code>${sampleData}</code></pre>

      <h4>Requirements:</h4>
      <ol>
        <li>Use SQL window functions to calculate a 3-day moving average of revenue</li>
        <li>The moving average should include the current day and 2 previous days</li>
        <li>For the first 2 days, calculate average with available data only</li>
        <li>Return columns: <code>date</code>, <code>revenue</code>, <code>moving_avg_3day</code> (rounded to 2 decimals)</li>
        <li>Sort by date ascending</li>
      </ol>

      <h4>Expected Output (first few rows):</h4>
      <pre><code>date        | revenue | moving_avg_3day
2024-01-01  | 1000    | 1000.00
2024-01-02  | 1500    | 1250.00
2024-01-03  | 1200    | 1233.33
2024-01-04  | 1800    | 1500.00
...</code></pre>

      <h4>Your Solution:</h4>
      <p>Write your SQL query (works in DuckDB/PostgreSQL):</p>
      <textarea 
        id="${questionId}-answer" 
        rows="15" 
        style="width: 100%; font-family: monospace;"
        placeholder="-- Assume table 'daily_revenue' with columns: date, revenue
SELECT 
  date,
  revenue,
  -- Your window function here
FROM daily_revenue
ORDER BY date;"></textarea>
    `,
    answer: async () => {
      const code = document.getElementById(`${questionId}-answer`).value;
      return { code };
    },
    help: [
      html`
        <h4>SQL Window Function Tips</h4>
        <ul>
          <li>Use <code>AVG(revenue) OVER (...)</code> for moving average</li>
          <li>Use <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code> for 3-day window</li>
          <li>Use <code>ORDER BY date</code> inside the OVER clause</li>
          <li>Use <code>ROUND(..., 2)</code> to round to 2 decimals</li>
        </ul>
      `,
    ],
  };
}