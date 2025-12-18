import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-classification-analysis";
  const title = "Classification: Customer Churn Prediction";

  const rng = seedrandom(`${user.email}#${id}`);

  const contractTypes = ["Month-to-month", "One year", "Two year"];
  const internetServices = ["DSL", "Fiber optic", "No"];
  const paymentMethods = [
    "Electronic check",
    "Mailed check",
    "Bank transfer",
    "Credit card",
  ];

  const randomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
  const randomFloat = (min, max, decimals = 2) => {
    const factor = 10 ** decimals;
    return Math.round((min + rng() * (max - min)) * factor) / factor;
  };

  // Generate customer churn data
  const customerData = [];
  for (let i = 1; i <= 200; i++) {
    const tenure = randomInt(1, 72);
    const monthlyCharges = randomFloat(20, 120, 2);
    const contractType = contractTypes[randomInt(0, 2)];
    const internetService = internetServices[randomInt(0, 2)];
    const paymentMethod = paymentMethods[randomInt(0, 3)];

    // Simple churn logic: higher tenure, longer contract, lower charges = less likely to churn
    const churnProbability =
      (1 - Math.min(tenure / 72, 0.9)) *
      (contractType === "Month-to-month"
        ? 1.0
        : contractType === "One year"
        ? 0.6
        : 0.3) *
      (monthlyCharges / 120);

    const churn = rng() < churnProbability ? "Yes" : "No";

    customerData.push({
      customer_id: `CUST-${String(i).padStart(5, "0")}`,
      tenure_months: tenure,
      monthly_charges: monthlyCharges,
      contract_type: contractType,
      internet_service: internetService,
      payment_method: paymentMethod,
      churn: churn,
    });
  }

  // Calculate metrics
  const totalCustomers = customerData.length;
  const churnedCustomers = customerData.filter((c) => c.churn === "Yes").length;
  const churnRate = ((churnedCustomers / totalCustomers) * 100).toFixed(2);
  const avgTenureChurned = (
    customerData
      .filter((c) => c.churn === "Yes")
      .reduce((sum, c) => sum + c.tenure_months, 0) / churnedCustomers
  ).toFixed(2);
  const avgTenureRetained = (
    customerData
      .filter((c) => c.churn === "No")
      .reduce((sum, c) => sum + c.tenure_months, 0) /
    (totalCustomers - churnedCustomers)
  ).toFixed(2);

  // Create CSV content
  const csvContent = `customer_id,tenure_months,monthly_charges,contract_type,internet_service,payment_method,churn
${customerData
  .map(
    (c) =>
      `${c.customer_id},${c.tenure_months},${c.monthly_charges},"${c.contract_type}","${c.internet_service}","${c.payment_method}",${c.churn}`
  )
  .join("\n")}`;

  const blob = new Blob([csvContent], { type: "text/csv" });

  const question = html`
    <div class="mb-3">
      <h2>Classification: Customer Churn Prediction Analysis</h2>
      <p>
        You have been given a dataset of customer information including their
        tenure, charges, contract type, and whether they churned (left the
        company). Your task is to analyze this data and build a classification
        model to predict churn.
      </p>

      <h3>Dataset Overview</h3>
      <p>The <code>customers</code> table contains the following columns:</p>
      <ul>
        <li><strong>customer_id</strong>: Unique customer identifier</li>
        <li><strong>tenure_months</strong>: Number of months as a customer</li>
        <li><strong>monthly_charges</strong>: Monthly service charges ($)</li>
        <li>
          <strong>contract_type</strong>: Type of contract (Month-to-month, One
          year, Two year)
        </li>
        <li>
          <strong>internet_service</strong>: Type of internet service (DSL,
          Fiber optic, No)
        </li>
        <li><strong>payment_method</strong>: Payment method used</li>
        <li><strong>churn</strong>: Whether customer churned (Yes/No)</li>
      </ul>

      <h3>Analysis Tasks</h3>
      <ol>
        <li>
          <strong>Data Exploration:</strong> Load the CSV file and explore the
          data. Calculate descriptive statistics (mean, median, std dev) for
          tenure and monthly charges.
        </li>
        <li>
          <strong>Class Distribution:</strong> Count how many customers churned
          vs. retained. Calculate the churn rate (percentage).
        </li>
        <li>
          <strong>Feature Analysis:</strong> Analyze how each feature relates to
          churn. Compare average tenure and charges between churned and retained
          customers.
        </li>
        <li>
          <strong>Classification Model:</strong> Build a logistic regression or
          decision tree classifier to predict churn. Use tenure_months,
          monthly_charges, and contract_type as features.
        </li>
        <li>
          <strong>Model Evaluation:</strong> Calculate accuracy, precision,
          recall, and F1-score on your training/test data.
        </li>
      </ol>

      <p>
        Download the dataset to use for your analysis:
        <button
          type="button"
          class="btn btn-sm btn-outline-primary"
          @click=${() => download(blob, "customers_churn.csv")}
        >
          Download customers_churn.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        <strong>Analysis Summary:</strong> Paste your complete analysis
        including: 1) Data exploration summary, 2) Churn statistics, 3) Feature
        analysis findings, 4) Model code and performance metrics, 5) Key
        insights
      </label>
      <textarea
        class="form-control font-monospace"
        id="${id}"
        name="${id}"
        rows="10"
        placeholder="## Data Exploration&#10;- Total customers: ...&#10;- Mean tenure: ...&#10;&#10;## Churn Analysis&#10;- Churned: ...&#10;- Churn Rate: ...&#10;&#10;## Model Results&#10;- Accuracy: ..."
        required
      ></textarea>
    </div>
  `;

  const answer = (input) => {
    const analysisText = input.trim();

    // Verify analysis content
    const requiredElements = [
      "churn",
      "accuracy",
      "feature",
      "model",
      "classification",
    ];

    for (const element of requiredElements) {
      if (!analysisText.toLowerCase().includes(element)) {
        throw new Error(`Analysis must discuss: "${element}"`);
      }
    }

    // Check for model metrics
    if (!analysisText.match(/accuracy|precision|recall|f1/i)) {
      throw new Error(
        "Analysis should include model performance metrics (accuracy, precision, recall, F1-score)"
      );
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
