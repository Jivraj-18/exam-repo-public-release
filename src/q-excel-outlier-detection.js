import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";

export default async function({ user, weight = 1 }) {
  const id = "q-excel-outlier-detection"; // Keep filename ID to avoid build errors
  const title = "Excel: Loan Amortization (PMT)";

  const random = seedrandom(`${user.email}#${id}`);
  
  // Generate random loan parameters
  const principal = Math.floor(random() * 50000) + 10000; // 10k to 60k
  const rateAnnual = (Math.floor(random() * 50) + 20) / 10; // 2.0% to 7.0%
  const years = Math.floor(random() * 5) + 3; // 3 to 7 years
  
  // Calculate PMT manually for validation: P * r * (1+r)^n / ((1+r)^n - 1)
  const r = (rateAnnual / 100) / 12;
  const n = years * 12;
  const pmt = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const answerVal = pmt.toFixed(2);

  const answer = async (response) => {
    const val = parseFloat(response);
    if (isNaN(val)) throw new Error("Enter a valid number");
    // Allow small margin of error for rounding
    if (Math.abs(val - pmt) > 0.05) {
      throw new Error(`Incorrect. Expected approx ${answerVal}. Did you divide the rate by 12?`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>FinTech: Mortgage Calculator</h2>
      <p>
        A client needs to know their monthly payment for a standardized loan. 
        Use Excel's <code>PMT</code> function to calculate the monthly installment.
      </p>
      
      <table class="table table-bordered" style="width: auto;">
        <tr><th>Parameter</th><th>Value</th></tr>
        <tr><td>Principal Amount (Pv)</td><td>$${principal.toLocaleString()}</td></tr>
        <tr><td>Annual Interest Rate</td><td>${rateAnnual}%</td></tr>
        <tr><td>Duration</td><td>${years} Years</td></tr>
        <tr><td>Payments per Year</td><td>12</td></tr>
      </table>

      <h3>Task</h3>
      <ol>
        <li>Open Excel.</li>
        <li>Use <code>=PMT(rate, nper, pv)</code>.</li>
        <li><strong>Note:</strong> Divide the annual rate by 12, and multiply years by 12 for <code>nper</code>.</li>
        <li>Enter the positive value of the monthly payment (round to 2 decimal places).</li>
      </ol>

      <label for="${id}" class="form-label">Monthly Payment ($):</label>
      <input class="form-control" id="${id}" name="${id}" type="number" step="0.01" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}