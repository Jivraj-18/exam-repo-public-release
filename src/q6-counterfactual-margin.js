import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-counterfactual-margin-reconstruction";
  const title = "Counterfactual Margin Reconstruction Under Fixed Category Mix";

  const random = seedrandom(`${user.email}#${id}`);

  /* --------------------------------------------------
     Synthetic dataset configuration
  ---------------------------------------------------*/
  const categories = [
    "Consumer",
    "SMB",
    "Enterprise",
    "Education",
    "Healthcare",
  ];

  const months = Array.from({ length: 14 }, (_, i) => {
    const m = i + 1;
    return `2024-${String(m).padStart(2, "0")}`;
  });

  const launchMonthIndex = randomInt(5, 8);
  const launchMonth = months[launchMonthIndex];

  function randomInt(min, max) {
    return Math.floor(random() * (max - min + 1)) + min;
  }

  /* --------------------------------------------------
     Generate transactional margin data
  ---------------------------------------------------*/
  const rows = [];

  for (const category of categories) {
    let baseRevenue = 80000 + random() * 90000;
    let baseCostRatio = 0.55 + random() * 0.15;

    for (const month of months) {
      const isPostLaunch = month >= launchMonth;

      // Category mix shift after launch (the trap)
      const volumeMultiplier = isPostLaunch
        ? 0.7 + random() * 1.1
        : 0.85 + random() * 0.4;

      const revenue = baseRevenue * volumeMultiplier * (0.9 + random() * 0.2);

      // Margin improvement post-launch, uneven across categories
      const costRatio = isPostLaunch
        ? baseCostRatio - (0.03 + random() * 0.04)
        : baseCostRatio + random() * 0.02;

      const cost = revenue * costRatio;

      rows.push({
        month,
        category,
        revenue: Math.round(revenue),
        cost: Math.round(cost),
      });

      baseRevenue *= 0.98 + random() * 0.05;
    }
  }

  /* --------------------------------------------------
     Build CSV
  ---------------------------------------------------*/
  const csvLines = [
    "month,category,revenue,cost",
    ...rows.map(
      r => `${r.month},${r.category},${r.revenue},${r.cost}`
    ),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* --------------------------------------------------
     Hidden evaluation logic
  ---------------------------------------------------*/

  // Step 1: determine baseline (pre-launch) category mix
  const baselineRows = rows.filter(r => r.month < launchMonth);

  const baselineRevenueByCategory = {};
  let baselineTotalRevenue = 0;

  for (const r of baselineRows) {
    baselineRevenueByCategory[r.category] =
      (baselineRevenueByCategory[r.category] || 0) + r.revenue;
    baselineTotalRevenue += r.revenue;
  }

  const baselineMix = {};
  for (const c of categories) {
    baselineMix[c] = baselineRevenueByCategory[c] / baselineTotalRevenue;
  }

  // Step 2: compute observed post-launch margins per category
  const postRows = rows.filter(r => r.month >= launchMonth);

  const postRevenue = {};
  const postCost = {};

  for (const r of postRows) {
    postRevenue[r.category] =
      (postRevenue[r.category] || 0) + r.revenue;
    postCost[r.category] =
      (postCost[r.category] || 0) + r.cost;
  }

  const postMargins = {};
  for (const c of categories) {
    postMargins[c] =
      (postRevenue[c] - postCost[c]) / postRevenue[c];
  }

  // Step 3: reconstruct counterfactual margin
  let counterfactualMargin = 0;
  for (const c of categories) {
    counterfactualMargin += baselineMix[c] * postMargins[c];
  }

  counterfactualMargin = Math.round(counterfactualMargin * 10000) / 10000;

  /* --------------------------------------------------
     Answer validator
  ---------------------------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter a numeric margin value.");
    }

    if (Math.abs(numeric - counterfactualMargin) > 0.0005) {
      throw new Error(
        "Incorrect. Counterfactual margin must use baseline category mix with post-launch margins."
      );
    }

    return true;
  };

  /* --------------------------------------------------
     Question text
  ---------------------------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Counterfactual Margin Reconstruction Under Fixed Category Mix</h2>

      <p>
        A product launch occurred in <strong>${launchMonth}</strong>, after which
        both margins and category composition changed.
      </p>

      <p>
        Leadership wants to understand whether the margin improvement was driven
        by <em>better performance</em> or simply by a <em>shift in category mix</em>.
      </p>

      <h3>Task</h3>
      <ol>
        <li>Use all months <strong>before ${launchMonth}</strong> to compute the baseline revenue mix by category.</li>
        <li>Compute the observed post-launch margin for each category.</li>
        <li>
          Reconstruct the <strong>counterfactual overall margin</strong> assuming
          the <em>baseline category mix</em> but <em>post-launch category margins</em>.
        </li>
      </ol>

      <p class="text-muted">
        ⚠️ You must freeze the category mix at baseline proportions.
        Using post-launch revenue weights will produce an incorrect result.
      </p>

      <p>
        Download the dataset:
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(blob, `${id}.csv`)}
        >
          ${id}.csv
        </button>
      </p>

      <label for="${id}" class="form-label">
        Counterfactual overall margin:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Enter as a decimal (e.g., 0.3275).</p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
