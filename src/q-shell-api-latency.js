import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "shell_api_latency";
  const title = "Shell: API Latency Breach Audit";

  const answer = 1245;

  const question = html`
    <div class="mb-3">
      <p>
        Orbit Commerce detected intermittent slowness during checkout.
      </p>
      <p>
        Each log line looks like:
      </p>
      <pre>
2024-06-14T09:42:18Z POST /api/checkout/submit status=201 bytes=1842 rt=932ms cluster=use1
      </pre>
      <p>
        Filter POST requests to <code>/api/checkout*</code> with status 2xx,
        response time &gt; 800 ms, cluster <code>use1</code>, occurring on Fridays (UTC).
        Compute the <strong>95th percentile</strong> of response times and round
        to the nearest integer.
      </p>
      <label for="${id}" class="form-label">95th percentile (ms):</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
