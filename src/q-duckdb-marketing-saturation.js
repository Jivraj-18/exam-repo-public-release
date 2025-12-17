export default function ({ user, weight = 1.5 }) {
  const marketingData = [
    { spend_bin: 0, avg_revenue: 8000, roi: 0 },
    { spend_bin: 5000, avg_revenue: 45000, roi: 9.0 },
    { spend_bin: 10000, avg_revenue: 95000, roi: 9.5 },
    { spend_bin: 15000, avg_revenue: 150000, roi: 10.0 },
    { spend_bin: 20000, avg_revenue: 210000, roi: 10.5 },
    { spend_bin: 25000, avg_revenue: 280000, roi: 11.2 },
    { spend_bin: 30000, avg_revenue: 320000, roi: 10.67 },
    { spend_bin: 35000, avg_revenue: 350000, roi: 10.0 },
    { spend_bin: 40000, avg_revenue: 360000, roi: 9.0 },
    { spend_bin: 45000, avg_revenue: 360000, roi: 8.0 },
    { spend_bin: 50000, avg_revenue: 350000, roi: 7.0 },
  ];

  // Derive saturation point from data (no hard-coding)
  const peak = marketingData.reduce((max, row) =>
    row.roi > max.roi ? row : max
  );

  const saturationPoint = peak.spend_bin;

  return {
    id: "duckdb_marketing_saturation",
    type: "input",
    weight,
    placeholder: "25000",

    label: "DuckDB: Marketing Spend Saturation Point",

    description: /* html */ `
      <h3>Identify Marketing Spend Saturation</h3>

      <p>
        You are analyzing aggregated marketing performance data similar to what
        you might query using DuckDB:
      </p>

      <pre><code>
SELECT spend_bin, AVG(revenue) AS avg_revenue, roi
FROM marketing_performance
ORDER BY spend_bin;
      </code></pre>

      <h4>Dataset (Spend vs ROI)</h4>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Spend Bin (USD)</th>
            <th>Avg Revenue</th>
            <th>ROI</th>
          </tr>
        </thead>
        <tbody>
          ${marketingData
            .map(
              r =>
                `<tr><td>$${r.spend_bin}</td><td>$${r.avg_revenue}</td><td>${r.roi}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>

      <h4>Task</h4>
      <p>
        The <strong>saturation point</strong> is defined as the spend level where
        ROI reaches its maximum value. Beyond this point, additional spend leads
        to diminishing returns.
      </p>

      <p><strong>Your answer:</strong> Enter the spend amount (USD) where ROI is highest.</p>
    `,

    help: [
      /* html */ `
      <p><strong>Hint:</strong></p>
      <ul>
        <li>Identify the maximum ROI value</li>
        <li>Return the corresponding spend_bin</li>
        <li>This is equivalent to: <code>SELECT spend_bin FROM table ORDER BY roi DESC LIMIT 1</code></li>
      </ul>
      `,
    ],

    check: ({ answer }) => {
      const value = parseFloat(answer.trim());

      if (isNaN(value) || value < 0) {
        return {
          pass: false,
          message: "✗ Please enter a valid positive number",
        };
      }

      return {
        pass: value === saturationPoint,
        message:
          value === saturationPoint
            ? `✓ Correct! ROI peaks at $${saturationPoint}, after which returns decline.`
            : `✗ Incorrect. Look for the spend bin where ROI is highest.`,
      };
    },
  };
}
