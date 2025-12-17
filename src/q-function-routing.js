import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q_function_routing";
  const title = "Function Routing API";

  const answer = "/route"; // Anchor

  const question = html`
    <div class="mb-3">
      <p><b>Function Routing Endpoint</b></p>

      <p>Provide ONLY the URL of your FastAPI <code>/route</code> endpoint.</p>

      <p>This endpoint must:</p>
      <ul>
        <li>Accept GET /route?q=...</li>
        <li>Parse natural language</li>
        <li>Map to one of:</li>
        <ul>
          <li><code>create_event</code></li>
          <li><code>cancel_event</code></li>
          <li><code>register_user</code></li>
          <li><code>get_event_details</code></li>
        </ul>
        <li>Return JSON with "name" and "arguments"</li>
        <li>CORS enabled</li>
      </ul>

      <label for=${id} class="form-label">Endpoint URL:</label>
      <input class="form-control" id=${id} name=${id} />
    </div>
  `;

  return { id, title, weight, question, answer };
}
