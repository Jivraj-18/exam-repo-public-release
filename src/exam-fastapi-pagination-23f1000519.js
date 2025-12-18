import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-fastapi-pagination-23f1000519";
  const title = "FastAPI: Paginated Logs API with Metadata";

  const question = html`
    <div class="mb-3">
      <p>
        You are given a JSON file containing an array of log entries.
        Each log entry has the fields:
        <code>timestamp</code>, <code>level</code>, and <code>message</code>.
      </p>

      <p>
        Write a <strong>FastAPI</strong> application with a
        <code>GET /logs</code> endpoint that:
      </p>

      <ul>
        <li>Accepts query parameters <code>offset</code> and <code>limit</code></li>
        <li>Returns only the requested slice of logs</li>
        <li>Preserves the original order of logs</li>
        <li>Returns metadata fields: <code>total</code>, <code>offset</code>, and <code>limit</code></li>
      </ul>

      <p>
        The response must be of the form:
      </p>

      <pre><code>{
  "total": 250,
  "offset": 10,
  "limit": 5,
  "logs": [ ... ]
}</code></pre>

      <p>
        Enable <strong>CORS</strong> to allow GET requests from any origin.
      </p>

      <p>
        Enter the <strong>full URL</strong> of your <code>/logs</code> API endpoint.
      </p>

      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
      />

      <p class="text-muted">
        We will call this endpoint with different <code>offset</code> and
        <code>limit</code> values and verify the response structure and order.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("API URL is required");

    let resp;
    try {
      resp = await fetch(`${url}?offset=0&limit=3`);
    } catch {
      throw new Error("Could not reach the FastAPI endpoint");
    }

    if (!resp.ok) throw new Error("Endpoint did not return HTTP 200");

    const contentType = resp.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      throw new Error("Response must be JSON");
    }

    let data;
    try {
      data = await resp.json();
    } catch {
      throw new Error("Response body is not valid JSON");
    }

    if (typeof data !== "object") {
      throw new Error("Response must be a JSON object");
    }

    if (!Array.isArray(data.logs)) {
      throw new Error("Response must include a 'logs' array");
    }

    if (typeof data.total !== "number") {
      throw new Error("Response must include numeric 'total'");
    }

    if (typeof data.offset !== "number" || typeof data.limit !== "number") {
      throw new Error("Response must include numeric 'offset' and 'limit'");
    }

    return true;
  };

  return { id, title, weight, question, answer };
}
