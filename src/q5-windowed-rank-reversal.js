import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { download } from "./download.js";
import { pick } from "./utils/random.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-windowed-rank-reversal";
  const title = "Windowed Rank Reversal Under Declining Performance";

  const random = seedrandom(`${user.email}#${id}`);

  /* -----------------------------------
     Synthetic data configuration
  ------------------------------------*/
  const entities = Array.from({ length: 9 }, (_, i) => `Entity-${i + 1}`);
  const days = Array.from({ length: 28 }, (_, i) =>
    `2024-07-${String(i + 1).padStart(2, "0")}`
  );

  /* -----------------------------------
     Generate time series with hidden decline
  ------------------------------------*/
  const rows = [];

  for (const entity of entities) {
    let base = 500 + random() * 300;
    let decay = random() * 4 + 1;

    for (const day of days) {
      // controlled downward drift
      base -= decay;

      // relative volatility
      const noise = random() * 40 - 20;

      rows.push({
        entity,
        day,
        score: Math.max(50, Math.round(base + noise)),
      });
    }
  }

  /* -----------------------------------
     CSV construction
  ------------------------------------*/
  const csvLines = [
    "entity,day,score",
    ...rows.map(r => `${r.entity},${r.day},${r.score}`),
  ];
  const blob = new Blob([csvLines.join("\n")], { type: "text/csv" });

  /* -----------------------------------
     Hidden evaluation logic
  ------------------------------------*/

  const windowSize = 7;

  // Group by entity
  const byEntity = {};
  for (const r of rows) {
    if (!byEntity[r.entity]) byEntity[r.entity] = [];
    byEntity[r.entity].push(r);
  }

  // Compute rolling averages
  const rolling = [];
  for (const entity of entities) {
    const series = byEntity[entity];
    for (let i = windowSize - 1; i < series.length; i++) {
      const window = series.slice(i - windowSize + 1, i + 1);
      const avg =
        window.reduce((s, r) => s + r.score, 0) / windowSize;

      rolling.push({
        entity,
        day: series[i].day,
        avg,
      });
    }
  }

  // Rank per day
  const byDay = {};
  for (const r of rolling) {
    if (!byDay[r.day]) byDay[r.day] = [];
    byDay[r.day].push(r);
  }

  const ranked = [];
  for (const day of Object.keys(byDay)) {
    const sorted = byDay[day]
      .slice()
      .sort((a, b) => b.avg - a.avg);

    let rank = 1;
    let prev = null;

    for (let i = 0; i < sorted.length; i++) {
      if (prev !== null && sorted[i].avg < prev) {
        rank = i + 1;
      }
      ranked.push({
        entity: sorted[i].entity,
        day,
        rank,
        avg: sorted[i].avg,
      });
      prev = sorted[i].avg;
    }
  }

  // Detect rank reversals with declining average
  let count = 0;
  const lastSeen = {};

  for (const r of ranked.sort((a, b) => a.day.localeCompare(b.day))) {
    const prev = lastSeen[r.entity];
    if (prev) {
      const rankImproved = r.rank < prev.rank;
      const valueDeclined = r.avg < prev.avg;

      if (rankImproved && valueDeclined) {
        count += 1;
      }
    }
    lastSeen[r.entity] = r;
  }

  /* -----------------------------------
     Answer validator
  ------------------------------------*/
  const answer = async (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      throw new Error("Enter the count of rank-reversal events.");
    }
    if (numeric !== count) {
      throw new Error(
        "Incorrect. Rank reversals must coincide with declining rolling averages."
      );
    }
    return true;
  };

  /* -----------------------------------
     Question text
  ------------------------------------*/
  const question = html`
    <div class="mb-3">
      <h2>Windowed Rank Reversal Under Declining Performance</h2>

      <p>
        You are given daily performance scores for multiple entities.
        Analysts compute a <strong>7-day trailing average</strong> for each entity.
      </p>

      <p>
        For each day where a trailing window exists:
      </p>

      <ol>
        <li>Compute the 7-day trailing average per entity.</li>
        <li>Rank entities per day by trailing average (highest = rank 1).</li>
        <li>Handle ties using standard SQL <code>RANK()</code> semantics.</li>
      </ol>

      <p>
        A <strong>rank reversal event</strong> is defined as a day where:
      </p>

      <ul>
        <li>An entity's rank improves compared to the previous day <em>and</em></li>
        <li>Its trailing average is strictly lower than the previous day.</li>
      </ul>

      <p>
        <strong>Task:</strong> Count the total number of rank reversal events
        across all entities.
      </p>

      <p class="text-muted">
        ⚠️ Absolute performance and relative rank can diverge.
        Naïve interpretations will fail.
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
        Number of rank reversal events:
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
    </div>
  `;

  return { id, title, weight, question, answer };
}
