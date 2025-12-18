// q-fastapi-rate-limiting.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-rate-limiting";
  const title = "FastAPI Rate Limiting";

  const answer = "Limits each IP to 60 requests/min and returns 429 on breach";

  const question = html`
    <div class="mb-3">
      <p>
        You are exposing a FastAPI endpoint <code>/metrics</code> that will be
        called from a public dashboard. Implement a minimal rate limiter that:
      </p>
      <ul>
        <li>Limits each client IP to 60 requests per minute.</li>
        <li>
          Returns HTTP 429 with
          <code>{ "detail": "Too Many Requests" }</code> when the limit is
          exceeded.
        </li>
        <li>
          Adds an <code>X-RateLimit-Remaining</code> header to successful
          responses.
        </li>
        <li>
          Uses an in-memory store that can be swapped out for Redis later, so
          it remains compatible with serverless deployments.
        </li>
      </ul>
      <p>Paste your <code>app.py</code> or <code>server.py</code> code below:</p>
      <label for="${id}" class="form-label">FastAPI code:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="14"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
