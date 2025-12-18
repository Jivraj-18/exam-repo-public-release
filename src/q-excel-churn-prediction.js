import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 0.75 }) {
  const id = "q-excel-churn-prediction";
  const title = "Excel: Customer Churn Prediction Regression";

  const random = seedrandom(`${user.email}#${id}`);

  const totalCustomers = 80 + Math.floor(random() * 40); // 80-119
  const rows = [["customer_id", "account_age_months", "monthly_spend_usd", "support_tickets", "churn_flag"]];

  const randomNormal = () => {
    const u1 = Math.max(random(), Number.EPSILON);
    const u2 = random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  // Regression coefficients (simplified model)
  const intercept = 0.85;
  const ageCoeff = -0.012; // Older accounts churn less
  const spendCoeff = -0.008; // Higher spenders churn less
  const ticketCoeff = 0.04; // More support tickets indicate churn risk

  let totalChurn = 0;

  for (let i = 1; i <= totalCustomers; i++) {
    const accountAge = 2 + Math.floor(random() * 36); // 2-37 months
    const monthlySpend = 25 + Math.random() * 475; // $25-500
    const supportTickets = Math.floor(Math.abs(randomNormal() * 3 + 2)); // 0-8 tickets

    // Logistic regression probability
    const logit =
      intercept +
      ageCoeff * accountAge +
      spendCoeff * monthlySpend +
      ticketCoeff * supportTickets +
      randomNormal() * 0.15;
    const churnProb = 1 / (1 + Math.exp(-logit));
    const churnFlag = random() < churnProb ? 1 : 0;

    if (churnFlag === 1) totalChurn++;

    rows.push([
      `C${String(i).padStart(4, "0")}`,
      accountAge,
      Math.round(monthlySpend * 100) / 100,
      supportTickets,
      churnFlag,
    ]);
  }

  // Test case: predict churn for new customer
  const testAge = 6;
  const testSpend = 120;
  const testTickets = 3;
  const testLogit =
    intercept + ageCoeff * testAge + spendCoeff * testSpend + ticketCoeff * testTickets;
  const testChurnProb = (1 / (1 + Math.exp(-testLogit)) * 100).toFixed(2);

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });

  const answer = async (response) => {
    if (!response) throw new Error("Enter the churn probability as a percentage.");
    let value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the probability.");

    // Accept as percentage if less than 1, otherwise assume already percentage
    if (!response.includes("%") && value < 1) value *= 100;

    const tolerance = 2; // 2 percentage points
    if (Math.abs(value - testChurnProb) > tolerance) {
      throw new Error(
        `Recalculate the churn probability. Run Data > Data Analysis > Regression with account_age_months, monthly_spend_usd, and support_tickets as X variables and churn_flag as Y. Apply the coefficients to: age=${testAge}, spend=${testSpend}, tickets=${testTickets}.`,
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>InsightPlus: Customer Churn Risk Modeling</h2>
      <p>
        InsightPlus wants to predict customer churn using account behavior metrics. Leadership has collected 12 months of
        data and wants an Excel regression model to identify at-risk accounts and optimize retention budgets.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>customer_id</code>: Unique customer identifier</li>
        <li><code>account_age_months</code>: Months since account creation</li>
        <li><code>monthly_spend_usd</code>: Average monthly spending</li>
        <li><code>support_tickets</code>: Number of support interactions in past quarter</li>
        <li><code>churn_flag</code>: 1 if churned, 0 if retained</li>
      </ul>

      <h3>Your Task</h3>
      <ol>
        <li>Import the dataset into Excel.</li>
        <li>Run Data → Data Analysis → Regression with <code>churn_flag</code> as Y and the three behavior metrics as X.</li>
        <li>Review the coefficients and R-squared to confirm model significance.</li>
        <li>
          Apply the regression equation to predict churn probability for a new customer: <strong>6 months old</strong>,
          <strong>$120 monthly spend</strong>, <strong>3 support tickets</strong>.
        </li>
        <li>
          Report the predicted churn probability as a percentage (e.g., 35.2%). <em>Hint: Convert logit using logistic
            function.</em>
        </li>
      </ol>

      <p>
        Download the churn dataset:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.csv`)}>
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        What is the predicted churn probability (%) for a 6-month-old account with $120 monthly spend and 3 support
        tickets?
      </label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. 42.5%" required />
      <p class="text-muted">
        Use Excel regression coefficients and the logistic transformation: probability = 1 / (1 + e^(-logit))
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}

/* Recommended Excel workflow:

1. Open the CSV in Excel
2. Data > Data Analysis > Regression
3. Input Range Y: churn_flag column
4. Input Range X: account_age_months, monthly_spend_usd, support_tickets
5. Review the Coefficients table
6. Apply formula: =1/(1+EXP(-(intercept + age_coef*6 + spend_coef*120 + ticket_coef*3)))

*/
