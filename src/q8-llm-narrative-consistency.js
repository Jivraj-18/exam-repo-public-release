import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-narrative-metric-consistency";
  const title = "Narrative–Metric Consistency Scoring";

  const random = seedrandom(`${user.email}#${id}`);

  /* -------------------------------------------------
     Synthetic metric data (ground truth)
  --------------------------------------------------*/
  const weeks = Array.from({ length: 10 }, (_, i) => `Week-${i + 1}`);

  let base = 1000 + random() * 300;
  const metrics = weeks.map(w => {
    base += random() * 120 - 40; // noisy upward-ish drift
    return {
      week: w,
      active_users: Math.round(base),
    };
  });

  /* -------------------------------------------------
     Generate LLM-style narratives (some flawed)
  --------------------------------------------------*/
  const narrativeTemplates = [
    "The platform experienced steady and consistent growth throughout the period.",
    "User activity showed explosive growth, particularly in the later weeks.",
    "Engagement remained largely flat with minor fluctuations.",
    "There was a noticeable decline before a late recovery phase.",
    "Growth accelerated sharply after an initially slow start.",
  ];

  const narratives = weeks.map((w, i) => ({
    week: w,
    summary: pick(narrativeTemplates, random),
  }));

  /* -------------------------------------------------
     Export datasets
  --------------------------------------------------*/
  const metricCsv = [
    "week,active_users",
    ...metrics.map(r => `${r.week},${r.active_users}`),
  ].join("\n");

  const narrativeCsv = [
    "week,summary",
    ...narratives.map(r => `${r.week},"${r.summary}"`),
  ].join("\n");

  const metricBlob = new Blob([metricCsv], { type: "text/csv" });
  const narrativeBlob = new Blob([narrativeCsv], { type: "text/csv" });

  /* -------------------------------------------------
     Hidden evaluation logic
  --------------------------------------------------*/

  // True numeric trend slope (linear approximation)
  const xs = metrics.map((_, i) => i);
  const ys = metrics.map(r => r.active_users);

  const mean = arr => arr.reduce((s, v) => s + v, 0) / arr.length;

  const xBar = mean(xs);
  const yBar = mean(ys);

  const slope =
    xs.reduce((s, x, i) => s + (x - xBar) * (ys[i] - yBar), 0) /
    xs.reduce((s, x) => s + (x - xBar) ** 2, 0);

  /* -------------------------------------------------
     Narrative interpretation scoring
  --------------------------------------------------*/

  const interpretNarrative = (text) => {
    const t = text.toLowerCase();
    if (t.includes("explosive") || t.includes("sharply")) return 2;
    if (t.includes("steady") || t.includes("consistent") || t.includes("accelerated")) return 1;
    if (t.includes("flat")) return 0;
    if (t.includes("decline")) return -1;
    return 0;
  };

  const narrativeScores = narratives.map(n => interpretNarrative(n.summary));
  const avgNarrativeScore = mean(narrativeScores);

  /* -------------------------------------------------
     Consistency score computation
  --------------------------------------------------*/

  // Normalize slope to comparable scale
  const normalizedSlope = slope / mean(ys);

  // Consistency score penalizes mismatch in direction & magnitude
  const consistencyScore = Math.max(
    0,
    1 - Math.abs(normalizedSlope - avgNarrativeScore * 0.05)
  );

  /* -------------------------------------------------
     Answer validator
  --------------------------------------------------*/
  const answer = async (value) => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter a numeric consistency score.");
    }

    if (Math.abs(numeric - consistencyScore) > 0.02) {
      throw new Error("Incorrect consistency score. Narrative alignment was mis-evaluated.");
    }

    return true;
  };

  /* -------------------------------------------------
     Question text
  --------------------------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Narrative–Metric Consistency Scoring</h2>

      <p>
        Product teams increasingly rely on LLM-generated weekly summaries.
        However, narratives may exaggerate, understate, or contradict true performance metrics.
      </p>

      <p>
        You are given:
      </p>
      <ul>
        <li>A weekly time series of <strong>active users</strong></li>
        <li>A corresponding LLM-generated narrative for each week</li>
      </ul>

      <p>
        Analysts compute a <strong>consistency score</strong> that penalizes
        mismatches between numeric trends and narrative claims.
      </p>

      <ol>
        <li>Estimate the overall numeric growth trend.</li>
        <li>Quantify the implied growth direction/magnitude from narratives.</li>
        <li>Compute the final consistency score.</li>
      </ol>

      <p class="text-muted">
        ⚠️ Sentiment alone is insufficient. Direction and magnitude both matter.
        Overstated growth must be penalized.
      </p>

      <p>
        Download the datasets:
        <button
          class="btn btn-sm btn-outline-primary me-2"
          type="button"
          @click=${() => download(metricBlob, `${id}_metrics.csv`)}
        >
          Metrics
        </button>
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => download(narrativeBlob, `${id}_narratives.csv`)}
        >
          Narratives
        </button>
      </p>

      <label for="${id}" class="form-label">
        Consistency score (0–1):
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
