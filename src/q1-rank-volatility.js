import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-rank-volatility-partial-observability";
  const title = "Rank Volatility Under Partial Observability";

  const random = seedrandom(`${user.email}#${id}`);

  /* ------------------------------
     Synthetic data configuration
  --------------------------------*/
  const regions = [
    "North",
    "South",
    "East",
    "West",
    "Central",
    "North-East",
    "South-West",
  ];

  const totalWeeks = 14;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => `2024-W${String(i + 1).padStart(2, "0")}`);

  /* ------------------------------
     Generate sparse observational data
  --------------------------------*/
  const rows = [];

  for (const region of regions) {
    let baseline = Math.round(900 + random() * 600);

    for (const week of weeks) {
      // 22% chance a region does NOT report this week
      if (random() < 0.22) continue;

      // stochastic drift
      baseline += Math.round(random() * 160 - 80);

      rows.push({
        region,
        week,
        revenue: Math.max(120, baseline),
        reported_by: `rep-${Math.ceil(random() * 4)}`,
      });
    }
  }

  /* ------------------------------
     Build CSV
  --------------------------------*/
  const csvLines = [
    "region,week,revenue,reported_by",
    ...rows.map(r => `${r.region},${r.week},${r.revenue},${r.reported_by}`),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* ------------------------------
     Hidden evaluation logic
  --------------------------------*/

  // Step 1: forward-fill revenue per region
  const panel = {};
  for (const region of regions) {
    let lastSeen = null;

    for (const week of weeks) {
      const record = rows.find(r => r.region === region && r.week === week);
      if (record) lastSeen = record.revenue;

      if (!panel[week]) panel[week] = {};
      panel[week][region] = lastSeen;
    }
  }

  // Step 2: compute normalized ranks per week
  let previousRanks = null;
  let maxRankDisplacement = 0;

  for (const week of weeks) {
    const weekEntries = Object.entries(panel[week])
      .filter(([, v]) => v !== null);

    // Normalize to weekly total
    const total = weekEntries.reduce((s, [, v]) => s + v, 0);

    const ranked = weekEntries
      .map(([region, value]) => ({
        region,
        share: value / total,
      }))
      .sort((a, b) => b.share - a.share);

    const ranks = {};
    ranked.forEach((r, i) => {
      ranks[r.region] = i + 1;
    });

    // Compute displacement vs previous week
    if (previousRanks) {
      for (const region of Object.keys(ranks)) {
        if (previousRanks[region] !== undefined) {
          const displacement = Math.abs(ranks[region] - previousRanks[region]);
          maxRankDisplacement = Math.max(maxRankDisplacement, displacement);
        }
      }
    }

    previousRanks = ranks;
  }

  /* ------------------------------
     Answer validator
  --------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter a single numeric value representing the rank displacement.");
    }

    if (numeric !== maxRankDisplacement) {
      throw new Error("Incorrect. The maximum rank displacement does not match the fully normalized panel.");
    }

    return true;
  };

  /* ------------------------------
     Question text
  --------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Rank Volatility Under Partial Observability</h2>

      <p>
        You are given weekly regional revenue reports. Due to reporting gaps,
        not all regions appear every week.
      </p>

      <p>
        Business analysts reconstruct a complete panel using the following rules:
      </p>

      <ol>
        <li>For each region, missing weeks are forward-filled using the last observed revenue.</li>
        <li>Weeks prior to the first observation of a region are excluded for that region.</li>
        <li>For each week, revenues are normalized by that week's total.</li>
        <li>Regions are ranked weekly by normalized share (highest = rank 1).</li>
      </ol>

      <p>
        <strong>Task:</strong> Determine the <em>maximum absolute rank displacement</em>
        experienced by any region between two consecutive weeks.
      </p>

      <p class="text-muted">
        ⚠️ Common mistakes include zero-filling missing weeks, ranking raw revenue,
        or ignoring weekly renormalization.
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
        Maximum rank displacement:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
