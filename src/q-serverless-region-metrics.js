import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-serverless-metrics-json";
  const title = "Serverless Metrics Response";

  const answer = JSON.stringify({
    avg_latency: 159,
    p90_latency: 240,
    breaches: 1,
  });

  const question = html`
    <div class="mb-3">
      <p>
        A serverless endpoint receives the following JSON payload:
      </p>
      <pre>
{
  "region": "apac",
  "latencies": [120, 180, 95, 240, 160]
}
      </pre>
      <p>
        Return the <strong>JSON response body only</strong> containing:
        <ul>
          <li>Average latency</li>
          <li>90th percentile latency (nearest-rank)</li>
          <li>Count of values strictly greater than 200</li>
        </ul>
      </p>
      <label for="${id}" class="form-label">JSON response:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
