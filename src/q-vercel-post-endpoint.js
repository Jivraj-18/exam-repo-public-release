// File: src/q-vercel-post-endpoint.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-vercel-post-endpoint";
  const title = "Deploy a POST Analytics Endpoint to Vercel";

  const answer = "https://your-app.vercel.app/api/latency";

  const question = html`
    <div class="mb-3">
      <p>
        You deployed a FastAPI serverless function on Vercel that accepts a POST body
        <code>{"regions":[...],"threshold_ms":180}</code> and returns per-region metrics.
        What is the full POST endpoint URL (ending with <code>/api/latency</code>)?
      </p>
      <label for="${id}" class="form-label">Endpoint URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
