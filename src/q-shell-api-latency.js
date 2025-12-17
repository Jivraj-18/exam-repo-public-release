import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-shell-api-latency";
  const title = "Shell: API Latency Percentile Analysis";

  const answer = "__NUMERIC_MS__"; // Expected latency in milliseconds

  const question = html`
    <div class="mb-3">
      <p>
        From compressed HTTP logs, filter
        <strong>GET</strong> requests to
        <code>/api/payments</code> in the
        <strong>apse1</strong> cluster.
      </p>
      <p>
        Consider only requests during business hours
        (<strong>08:00–18:00 UTC</strong>) and successful responses.
      </p>
      <p>
        Compute the <strong>95th percentile</strong> response time.
      </p>
      <label for="${id}" class="form-label">
        95th percentile latency (ms):
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
