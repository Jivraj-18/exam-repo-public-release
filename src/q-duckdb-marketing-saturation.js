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
  
  const saturationPoint = 25000;
  
  return {
    id: "duckdb_marketing_saturation",
    type: "input",
    weight,
    placeholder: "25000",
    label: "DuckDB: Marketing Saturation Point Analysis",
    description: /* html */ `
      <h3>Analyze Marketing Spend Saturation</h3>
      
      <h4>Dataset: Marketing Spend vs Revenue (by $5K bins)</h4>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Spend Bin (USD)</th>
            <th>Avg Revenue</th>
            <th>ROI</th>
            <th>Trend</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>$0</td><td>$8,000</td><td>0.00</td><td>Baseline</td></tr>
          <tr><td>$5,000</td><td>$45,000</td><td>9.00</td><td>↑ Growing</td></tr>
          <tr><td>$10,000</td><td>$95,000</td><td>9.50</td><td>↑ Growing</td></tr>
          <tr><td>$15,000</td><td>$150,000</td><td>10.00</td><td>↑ Growing</td></tr>
          <tr><td>$20,000</td><td>$210,000</td><td>10.50</td><td>↑ Growing</td></tr>
          <tr><td>$25,000</td><td>$280,000</td><td><strong>11.20</strong></td><td><strong>📈 Peak</strong></td></tr>
          <tr><td>$30,000</td><td>$320,000</td><td>10.67</td><td>↓ Declining</td></tr>
          <tr><td>$35,000</td><td>$350,000</td><td>10.00</td><td>↓ Declining</td></tr>
          <tr><td>$40,000</td><td>$360,000</td><td>9.00</td><td>↓ Declining</td></tr>
          <tr><td>$45,000</td><td>$360,000</td><td>8.00</td><td>↓ Declining</td></tr>
          <tr><td>$50,000</td><td>$350,000</td><td>7.00</td><td>↓ Declining</td></tr>
        </tbody>
      </table>
      
      <h4>Task:</h4>
      <p><strong>Find the saturation point:</strong> The marketing spend level (upper boundary) where ROI peaks, beyond which additional spending shows diminishing returns.</p>
      
      <p><strong>Definition:</strong> The highest spend bin where ROI is still increasing. After this point, ROI decreases despite more spending.</p>
      
      <p><strong>Your answer:</strong> The saturation point in USD (upper boundary of the bin)</p>
    `,
    help: [/* html */ `
      <p><strong>How to find saturation point:</strong></p>
      <ol>
        <li>Look at the ROI column</li>
        <li>Find where ROI reaches its peak</li>
        <li>The saturation point is the spend amount at that peak</li>
        <li>After $25,000, ROI starts declining (11.20 → 10.67 → 10.00...)</li>
      </ol>
      <p><strong>Interpretation:</strong> Spending more than $25,000 per bin gives diminishing returns on investment.</p>
    `],
    check: ({ answer }) => {
      const saturation = parseFloat(answer.trim());
      
      if (isNaN(saturation) || saturation < 0) {
        return {
          pass: false,
          message: "✗ Please enter a valid positive number",
        };
      }
      
      const tolerance = 5000;
      const isCorrect = Math.abs(saturation - saturationPoint) <= tolerance;
      
      return {
        pass: isCorrect,
        message: isCorrect
          ? `✓ Correct! Saturation point: $${saturation}. ROI peaks here and then declines.`
          : `✗ Expected $${saturationPoint}, but got $${saturation}. Look for where ROI stops increasing.`,
      };
    },
  };
}