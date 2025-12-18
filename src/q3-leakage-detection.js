import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-delayed-outcome-leakage";
  const title = "Delayed Outcome Leakage Detection";

  const random = seedrandom(`${user.email}#${id}`);

  /* ---------------------------------
     Synthetic experiment configuration
  ----------------------------------*/
  const features = [
    "page_views",
    "scroll_depth",
    "email_open",
    "email_click",
    "promo_exposure",
    "support_ticket",
    "refund_request",
  ];

  const records = [];
  const totalUsers = 420;

  /* ---------------------------------
     Generate temporal interaction data
  ----------------------------------*/
  for (let userId = 1; userId <= totalUsers; userId++) {
    const outcomeTime = 100 + random() * 80; // purchase / churn time

    for (const feature of features) {
      const observations = Math.floor(3 + random() * 6);

      for (let i = 0; i < observations; i++) {
        // introduce leakage for some features
        const skew =
          feature === "refund_request" || feature === "support_ticket"
            ? 20 + random() * 40
            : -30 + random() * 60;

        const eventTime = outcomeTime + skew;

        records.push({
          user_id: userId,
          feature,
          event_time: Math.max(0, eventTime),
          outcome_time: outcomeTime,
          value: Math.round(1 + random() * 4),
        });
      }
    }
  }

  /* ---------------------------------
     Build CSV
  ----------------------------------*/
  const csvLines = [
    "user_id,feature,event_time,outcome_time,value",
    ...records.map(
      r =>
        `${r.user_id},${r.feature},${r.event_time.toFixed(2)},${r.outcome_time.toFixed(
          2
        )},${r.value}`
    ),
  ];

  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* ---------------------------------
     Hidden evaluation logic
  ----------------------------------*/

  // Step 1: compute median event_time per feature
  const byFeature = {};
  for (const r of records) {
    if (!byFeature[r.feature]) byFeature[r.feature] = [];
    byFeature[r.feature].push(r.event_time - r.outcome_time);
  }

  const nonLeakyFeatures = Object.entries(byFeature)
    .filter(([, deltas]) => {
      const sorted = deltas.slice().sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)];
      return median < 0; // must occur before outcome
    })
    .map(([feature]) => feature);

  // Step 2: keep only valid records
  const cleaned = records.filter(r => nonLeakyFeatures.includes(r.feature));

  // Step 3: compute final metric
  const expected =
    cleaned.reduce((s, r) => s + r.value, 0) / cleaned.length;

  /* ---------------------------------
     Answer validator
  ----------------------------------*/
  const answer = async value => {
    if (typeof value === "string") value = value.trim();
    const numeric = Number(value);

    if (!Number.isFinite(numeric)) {
      throw new Error("Enter the leakage-adjusted average value.");
    }

    if (Math.abs(numeric - expected) > 0.05) {
      throw new Error(
        "Incorrect. Ensure leaky features are excluded using median time logic."
      );
    }

    return true;
  };

  /* ---------------------------------
     Question text
  ----------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Delayed Outcome Leakage Detection</h2>

      <p>
        You are analyzing user interaction logs to understand behavioral signals
        preceding an outcome (e.g., purchase or churn).
      </p>

      <p>
        Each feature is recorded multiple times per user. Some features may be
        <strong>invalid predictors</strong> because they typically occur
        <em>after</em> the outcome.
      </p>

      <p>
        Analysts define a feature as <strong>leaky</strong> if its
        <em>median event time</em> occurs after the outcome time.
      </p>

      <h3>Steps</h3>
      <ol>
        <li>For each feature, compute the median of (event_time − outcome_time).</li>
        <li>Exclude features whose median delta is positive.</li>
        <li>Using the remaining records, compute the average <code>value</code>.</li>
      </ol>

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
        Leakage-adjusted average value:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />

      <p class="text-muted">
        ⚠️ Filtering rows by timestamp is insufficient. Leakage must be detected
        at the <em>feature level</em>.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
