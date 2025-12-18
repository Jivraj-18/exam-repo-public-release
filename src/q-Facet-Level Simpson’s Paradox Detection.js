import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-simpsons-paradox-facets";
  const title = "Facet-Level Simpson’s Paradox Detection";

  const random = seedrandom(`${user.email}#${id}`);

  /* ---------------------------------
     Configuration
  ----------------------------------*/
  const facets = [
    "SMB",
    "Mid-Market",
    "Enterprise",
    "Public-Sector",
    "Education",
    "Healthcare",
  ];

  const months = Array.from({ length: 12 }, (_, i) =>
    `2024-${String(i + 1).padStart(2, "0")}`
  );

  /* ---------------------------------
     Generate data with hidden paradox
  ----------------------------------*/
  const rows = [];

  let globalSlopeAccumulator = 0;

  for (const facet of facets) {
    let base = 100 + random() * 300;

    // Force some facets to have opposite local slope
    const localSlope =
      random() < 0.5
        ? -(2 + random() * 3) // decreasing
        : +(2 + random() * 3); // increasing

    for (let i = 0; i < months.length; i++) {
      // volume weight causes Simpson's paradox
      const volume =
        facet === "Enterprise"
          ? 400 + random() * 200
          : 60 + random() * 120;

      base += localSlope + random() * 6 - 3;

      rows.push({
        month: months[i],
        segment: facet,
        conversion_rate: Math.max(1, base),
        volume: Math.round(volume),
      });

      globalSlopeAccumulator += base * volume;
    }
  }

  /* ---------------------------------
     CSV construction
  ----------------------------------*/
  const csv = [
    "month,segment,conversion_rate,volume",
    ...rows.map(
      r =>
        `${r.month},${r.segment},${r.conversion_rate.toFixed(
          2
        )},${r.volume}`
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });

  /* ---------------------------------
     Hidden evaluation logic
  ----------------------------------*/

  // Global weighted trend
  const globalByMonth = {};
  for (const r of rows) {
    if (!globalByMonth[r.month]) {
      globalByMonth[r.month] = { total: 0, weight: 0 };
    }
    globalByMonth[r.month].total += r.conversion_rate * r.volume;
    globalByMonth[r.month].weight += r.volume;
  }

  const globalSeries = months.map(
    m => globalByMonth[m].total / globalByMonth[m].weight
  );

  const globalSlope =
    globalSeries[globalSeries.length - 1] - globalSeries[0];

  const globalDirection = Math.sign(globalSlope);

  // Facet-level trend directions
  let paradoxCount = 0;

  for (const facet of facets) {
    const series = rows
      .filter(r => r.segment === facet)
      .map(r => r.conversion_rate);

    const slope = series[series.length - 1] - series[0];
    const direction = Math.sign(slope);

    if (direction !== 0 && direction !== globalDirection) {
      paradoxCount += 1;
    }
  }

  /* ---------------------------------
     Answer validator
  ----------------------------------*/
  const answer = async value => {
    const numeric = Number(value);
    if (!Number.isInteger(numeric)) {
      throw new Error("Enter an integer count of paradoxical facets.");
    }

    if (numeric !== paradoxCount) {
      throw new Error(
        "Incorrect. The number of facets exhibiting Simpson’s paradox is incorrect."
      );
    }

    return true;
  };

  /* ---------------------------------
     Question UI
  ----------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Facet-Level Simpson’s Paradox Detection</h2>

      <p>
        You are analyzing conversion-rate trends across customer segments.
        Each segment has its own monthly conversion rate and traffic volume.
      </p>

      <p>
        When aggregated globally using volume-weighted averages, the overall
        trend may differ from trends observed within individual segments.
      </p>

      <p>
        <strong>Task:</strong>
        <br />
        <em>
          Determine how many segments exhibit a trend direction
          (increasing vs decreasing) that is opposite to the global
          volume-weighted trend.
        </em>
      </p>

      <p class="text-muted">
        ⚠️ Important:
        <br />
        • Global trends must be volume-weighted  
        <br />
        • Direction matters, magnitude does not  
        <br />
        • This phenomenon is known as Simpson’s Paradox
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
        Number of paradoxical segments:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
