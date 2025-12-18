import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-validation-rules";
  const title = "Python: Data Validation Rule Analysis";

  const rng = seedrandom(`${user.email}#${id}`);

  // ---------- Data Generation ----------
  const rows = [["order_id", "quantity", "unit_price", "discount_pct", "region"]];

  const regions = ["NA", "EU", "APAC"];
  const ruleNames = {
    R1: "Negative or zero quantity",
    R2: "Unit price out of range",
    R3: "Invalid discount percentage",
    R4: "High-value order missing discount",
  };

  const violationCounts = { R1: 0, R2: 0, R3: 0, R4: 0 };

  for (let i = 1; i <= 60; i++) {
    const quantity = Math.floor(-2 + rng() * 22); // -2 to 19
    const unitPrice = Math.round((5 + rng() * 520) * 100) / 100; // 5–525
    const discount = Math.round((-0.05 + rng() * 0.6) * 100) / 100; // -5% to 55%
    const region = regions[Math.floor(rng() * regions.length)];

    rows.push([`O${String(i).padStart(4, "0")}`, quantity, unitPrice, discount, region]);

    // Rule checks
    if (quantity <= 0) violationCounts.R1++;
    if (unitPrice < 10 || unitPrice > 500) violationCounts.R2++;
    if (discount < 0 || discount > 0.5) violationCounts.R3++;
    if (quantity * unitPrice > 4000 && discount === 0) violationCounts.R4++;
  }

  const mostViolatedRule = Object.entries(violationCounts).sort(
    (a, b) => b[1] - a[1],
  )[0][0];

  const csv = rows.map((r) => r.join(",")).join("\n");

  // ---------- Answer Validation ----------
  const answer = async (response) => {
    if (!response) throw new Error("Enter the rule identifier.");

    const normalized = response.trim().toUpperCase();
    if (normalized !== mostViolatedRule) {
      throw new Error(
        "Identify the rule with the highest number of violations after evaluating all rows."
      );
    }
    return true;
  };

  // ---------- Question UI ----------
  const question = html`
    <div class="mb-3">
      <h2>OrderFlow: Data Quality Audit</h2>

      <p>
        OrderFlow enforces strict validation rules before orders enter financial
        reporting. Your task is to <strong>identify which rule is violated most
        frequently</strong>.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>order_id</code>: Unique order identifier</li>
        <li><code>quantity</code>: Units ordered</li>
        <li><code>unit_price</code>: Price per unit (USD)</li>
        <li><code>discount_pct</code>: Discount fraction applied</li>
        <li><code>region</code>: Sales region</li>
      </ul>

      <h3>Validation Rules</h3>
      <ol>
        <li><strong>R1</strong>: Quantity must be positive</li>
        <li><strong>R2</strong>: Unit price must be between 10 and 500</li>
        <li><strong>R3</strong>: Discount must be between 0 and 0.5</li>
        <li>
          <strong>R4</strong>: Orders above $4000 must have a non-zero discount
        </li>
      </ol>

      <h3>Task</h3>
      <p>
        Evaluate all rows, count violations per rule, and return the
        <strong>rule ID</strong> (R1–R4) with the highest number of violations.
      </p>

      <details class="mb-3">
        <summary>Inline CSV Data</summary>
        <pre>${csv}</pre>
      </details>

      <label for="${id}" class="form-label">
        Which rule is violated most frequently?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. R2"
        required
      />

      <p class="text-muted">
        Hint: Apply each rule independently using boolean masks.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
