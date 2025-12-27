import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-python-irregular-event-rolling";
  const title = "Python: Rolling Metrics with Irregular Event Gaps";

  const rng = seedrandom(`${user.email}#${id}`);

  // ---------- Data Generation ----------
  const sensors = ["S1", "S2", "S3"];
  const rows = [["sensor_id", "timestamp", "reading"]];

  const baseTime = new Date("2025-01-01T08:00:00Z").getTime();
  const maxGapMinutes = 45;
  const windowSize = 3;

  let expectedValue = null;

  for (const sensor of sensors) {
    let currentTime = baseTime + rng() * 60 * 60 * 1000;
    const readings = [];

    for (let i = 0; i < 7; i++) {
      const gapMinutes = 5 + rng() * 70; // irregular gaps
      currentTime += gapMinutes * 60 * 1000;

      const reading = Math.round((20 + rng() * 60) * 10) / 10;
      rows.push([sensor, new Date(currentTime).toISOString(), reading]);
      readings.push({ t: currentTime, v: reading });
    }

    // Compute expected rolling value for S2 only
    if (sensor === "S2") {
      for (let i = windowSize - 1; i < readings.length; i++) {
        const window = readings.slice(i - windowSize + 1, i + 1);
        const gap =
          (window[window.length - 1].t - window[0].t) / (60 * 1000);

        if (gap <= maxGapMinutes) {
          expectedValue =
            Math.round(
              (window.reduce((s, r) => s + r.v, 0) / windowSize) * 10
            ) / 10;
          break;
        }
      }
    }
  }

  const csv = rows.map((r) => r.join(",")).join("\n");

  // ---------- Answer Validation ----------
  const answer = async (response) => {
    if (!response) throw new Error("Enter the rolling average.");

    const value = parseFloat(response.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(value)) throw new Error("Unable to parse the value.");

    const tolerance = 0.15;
    if (Math.abs(value - expectedValue) > tolerance) {
      throw new Error(
        "Recalculate the rolling average for sensor S2. Use the first valid 3-event window where the total gap does not exceed 45 minutes."
      );
    }
    return true;
  };

  // ---------- Question UI ----------
  const question = html`
    <div class="mb-3">
      <h2>SmartGrid: Event Stability Check</h2>

      <p>
        A smart-grid system collects sensor readings at <strong>irregular
        intervals</strong>. Engineers compute rolling metrics only when events
        occur close enough in time to ensure stability.
      </p>

      <h3>Dataset Schema</h3>
      <ul>
        <li><code>sensor_id</code>: Sensor identifier</li>
        <li><code>timestamp</code>: ISO-8601 event time</li>
        <li><code>reading</code>: Measured value</li>
      </ul>

      <h3>Task</h3>
      <ol>
        <li>Load the data into Pandas and parse timestamps.</li>
        <li>Focus only on sensor <strong>S2</strong>.</li>
        <li>
          Compute rolling averages over the <strong>last 3 events</strong>
          (event-based, not time-based).
        </li>
        <li>
          Ignore windows where the time gap between first and last event exceeds
          ${maxGapMinutes} minutes.
        </li>
        <li>
          Return the <strong>first valid rolling average</strong> rounded to
          <strong>1 decimal</strong>.
        </li>
      </ol>

      <details class="mb-3">
        <summary>Inline CSV Data</summary>
        <pre>${csv}</pre>
      </details>

      <label for="${id}" class="form-label">
        What is the first valid rolling average for sensor S2?
      </label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="e.g. 47.3"
        required
      />

      <p class="text-muted">
        Hint: Sort by timestamp and use event-count windows, not resample().
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}
