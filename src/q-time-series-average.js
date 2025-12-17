import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-time-series-average";
  const title = "Compute Weighted Moving Average";

  // Sample time-series JSON
  const data = [
    { timestamp: "2025-12-01T10:00:00Z", value: 10, weight: 2 },
    { timestamp: "2025-12-01T10:05:00Z", value: 15, weight: 1 },
    { timestamp: "2025-12-01T10:10:00Z", value: 20, weight: 3 },
    { timestamp: "2025-12-01T10:15:00Z", value: 5,  weight: 2 },
    { timestamp: "2025-12-01T10:20:00Z", value: 12, weight: 2 },
  ];

  // Convert JSON to downloadable blob
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

  // Validation function
  const answer = async (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) throw new Error("Enter a numeric value.");

    // Compute weighted average
    const totalWeight = data.reduce((sum, d) => sum + d.weight, 0);
    const weightedSum = data.reduce((sum, d) => sum + d.value * d.weight, 0);
    const weightedAvg = Math.round((weightedSum / totalWeight) * 100) / 100;

    if (Math.abs(numeric - weightedAvg) > 0.01) {
      throw new Error(`Incorrect. Correct weighted average: ${weightedAvg}`);
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Compute Weighted Moving Average</h2>
      <p>
        You are given a time-series JSON dataset. Each entry has a <code>value</code> and a <code>weight</code>. 
        Compute the weighted average of all values.
      </p>
      <p>
        Download the dataset:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.json`)}>
          ${id}.json
        </button>
      </p>
      <label for="${id}" class="form-label">
        Enter the weighted average rounded to two decimal places.
      </label>
      <input class="form-control" id="${id}" name="${id}" required />
      <p class="text-muted">Example: 13.25</p>
    </div>
  `;

  return { id, title, weight, question, answer };
};
