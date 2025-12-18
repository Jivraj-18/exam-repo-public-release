import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-duckdb-downtrend";
  const title = "DuckDB Windowed Downward Trend Detection";
  const answer = "1";

  const question = html`
    <div class="mb-3">
      <p>
        Reliability teams monitor latency trends to detect degradation.
        Sustained drops may indicate instability.
      </p>

      <p>
        Given the following daily latencies (ms):
      </p>

      <pre>
2025-12-01 → 120
2025-12-02 → 115
2025-12-03 → 118
2025-12-04 → 100
2025-12-05 → 95
2025-12-06 → 98
      </pre>

      <p>
        A <strong>downward trend streak</strong> is defined as
        <strong>3 or more consecutive days</strong> where the latency
        decreases by more than 5 ms compared to the previous day.
      </p>

      <p>
        Using a DuckDB window function with <code>LAG()</code>,
        count the number of such streaks.
      </p>

      <label for="${id}" class="form-label">Number of streaks:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
