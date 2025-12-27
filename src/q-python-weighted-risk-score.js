import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-weighted-risk-score";
  const title = "Python: Weighted Risk Score Analysis";

  const rng = seedrandom(`${user.email}#${id}`);

  // ---------- Data Generation ----------
  const categories = ["Retail", "SaaS", "Manufacturing", "Healthcare"];
  const rows = [["client_id", "category", "transactions", "incident_rate", "exposure_weight"]];

  const clientsPerCategory = 18 + Math.floor(rng() * 6); // 18–23
  const minTransactions = 40;

  let expectedScoreNumerator = 0;
  let expectedScoreDenominator = 0;

  let clientCounter = 1;

  for (const category of categories) {
    for (let i = 0; i < clientsPerCategory; i++) {
      const transactions = Math.floor(20 + rng() * 140); // 20–160
      const incidentRate = Math.round((0.01 + rng() * 0.18) * 1000) / 1000; // 0.01–0.19
      const exposureWeight = Math.round((0.5 + rng() * 1.5) * 100) / 100; // 0.5–2.0

      rows.push([
        `C${String(clientCounter++).padStart(4, "0")}`,
        category,
        transactions,
        incidentRate,
        exposureWeight,
      ]);

      // Only include valid rows in expected score
      if (transactions >= minTransactions) {
        expectedScoreNumerator += incidentRate * exposureWeight;
        expectedScoreDenominator += exposureWeight;
      }
    }
  }

  const expectedRiskScore =
    Math.round((expectedScoreNumerator / expectedScoreDenominator) * 1000) / 1000;

  const csv = rows.map((r) => r.join(",")).join("\n");

  // ---------- Answer Validation ----------
  const answer = async (response) => {
    if (!response) throw new Error("Enter the weighted risk score.");

    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the risk score.");

    const tolerance = 0.002;
    if (Math.abs(value - expectedRiskScore) > tolerance) {
      throw new Error(
        "Recalculate the weighted risk score. Remember to exclude low-activity clients and use exposure-weighted averaging."
      );
    }
    return true;
  };

  // ---------- Question UI ----------
  const question = html`
    <div class="mb-3">
      <h2>FinGuard: Portfolio Risk Scoring</h2>

      <p>
        FinGuard evaluates operational risk across a mixed client portfolio. Analysts compute a
        <strong>weighted risk score</strong> that reflects both incident frequency and exposure
        size.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>client_id</code>: Unique client identifier</li>
        <li><code>category</code>: Industry sector</li>
        <li><code>transactions</code>: Annual transaction count</li>
        <li><code>incident_rate</code>: Fraction of transactions with incidents</li>
        <li><code>exposure_weight</code>: Relative exposure factor</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load the dataset into Pandas.</li>
        <li>
          <strong>Exclude</strong> clients with fewer than ${minTransactions} transactions.
        </li>
        <li>
          Compute the <strong>weighted average incident rate</strong> using
          <code>exposure_weight</code>.
        </li>
        <li>Return the final risk score rounded to <strong>3 decimals</strong>.</li>
      </ol>

      <details class="mb-3">
        <summary>Inline CSV Data</summary>
        <pre>${csv}</pre>
      </details>

      <label for="${id}" class="form-label">
        What is the weighted portfolio risk score?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. 0.087"
        required
      />

      <p class="text-muted">
        Hint: Filter first, then compute <code>(incident_rate × weight) ÷ sum(weight)</code>.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
