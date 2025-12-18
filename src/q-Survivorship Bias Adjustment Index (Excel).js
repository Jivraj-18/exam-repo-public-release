import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-survivorship-adjusted-index";
  const title = "Survivorship Bias–Adjusted Performance Index";

  const random = seedrandom(`${user.email}#${id}`);

  /* ---------------------------------
     Configuration
  ----------------------------------*/
  const campaigns = Array.from({ length: 9 }, (_, i) => `CMP-${String(i + 1).padStart(2, "0")}`);
  const months = Array.from({ length: 11 }, (_, i) => `2024-M${String(i + 1).padStart(2, "0")}`);

  /* ---------------------------------
     Generate campaign lifecycle data
  ----------------------------------*/
  const rows = [];

  for (const campaign of campaigns) {
    let active = true;
    let baseScore = Math.round(140 + random() * 220);

    for (const month of months) {
      if (!active) continue;

      // Attrition probability increases over time
      if (random() < 0.08 + 0.01 * months.indexOf(month)) {
        active = false;
      }

      baseScore += Math.round(random() * 90 - 45);

      rows.push({
        campaign,
        month,
        performance_score: Math.max(20, baseScore),
        channel: pick(["email", "paid", "organic", "partner"], random),
      });
    }
  }

  /* ---------------------------------
     CSV creation
  ----------------------------------*/
  const csvLines = [
    "campaign,month,performance_score,channel",
    ...rows.map(
      r => `${r.campaign},${r.month},${r.performance_score},${r.channel}`,
    ),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* ---------------------------------
     Hidden evaluation logic
  ----------------------------------*/

  // Total months in scope (fixed denominator baseline)
  const totalMonths = months.length;

  // Step 1: compute campaign exposure weights
  const campaignWeights = {};
  for (const campaign of campaigns) {
    const activeMonths = rows.filter(r => r.campaign === campaign).length;
    campaignWeights[campaign] = activeMonths / totalMonths;
  }

  // Step 2: compute weighted numerator
  let weightedSum = 0;
  let totalWeight = 0;

  for (const campaign of campaigns) {
    const records = rows.filter(r => r.campaign === campaign);
    if (!records.length) continue;

    const avgScore =
      records.reduce((s, r) => s + r.performance_score, 0) / records.length;

    const weight = campaignWeights[campaign];
    weightedSum += avgScore * weight;
    totalWeight += weight;
  }

  const survivorshipAdjustedIndex = weightedSum / totalWeight;

  /* ---------------------------------
     Answer validation
  ----------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter a numeric index value.");
    }

    if (Math.abs(numeric - survivorshipAdjustedIndex) > 0.5) {
      throw new Error(
        "Incorrect. The index does not properly adjust for survivorship bias.",
      );
    }

    return true;
  };

  /* ---------------------------------
     Question text
  ----------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Survivorship Bias–Adjusted Performance Index</h2>

      <p>
        You are given monthly performance scores for marketing campaigns.
        Campaigns may discontinue at any point and therefore stop appearing
        in later months.
      </p>

      <p>
        A naive analyst computes the average performance using only campaigns
        that remain active, which introduces survivorship bias.
      </p>

      <p>
        To correct this, analysts use the following methodology:
      </p>

      <ol>
        <li>Each campaign is assigned an exposure weight equal to the fraction of months it was active.</li>
        <li>The average performance of each campaign is multiplied by its exposure weight.</li>
        <li>The final index is the weighted average across all campaigns.</li>
      </ol>

      <p>
        <strong>Task:</strong> Compute the survivorship bias–adjusted performance index.
      </p>

      <p class="text-muted">
        ⚠️ Dropped campaigns must still influence the denominator via their exposure weight.
        Simply averaging visible rows will produce an incorrect answer.
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
        Survivorship-adjusted index:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
