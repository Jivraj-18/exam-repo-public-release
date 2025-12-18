// q-ollama-load-testing.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ollama-load-testing";
  const title = "Ollama Load Testing Script";

  const answer =
    "Python script uses BASE_URL env, CLI args --concurrency/--requests/--model and prints min/max/mean/p95";

  const question = html`
    <div class="mb-3">
      <p>
        You operate a local Ollama instance serving an internal LLM API at
        <code>http://localhost:11434</code>. Create a small load-testing tool
        that:
      </p>
      <ul>
        <li>
          Is written in Python and can be run via
          <code>uv run loadtest.py</code>.
        </li>
        <li>
          Sends concurrent POST requests to <code>/api/chat</code> with a
          configurable model and prompt.
        </li>
        <li>
          Measures per-request latency and prints summary stats: min, max,
          mean, and p95 latency.
        </li>
        <li>
          Accepts parameters <code>--concurrency</code>,
          <code>--requests</code>, and <code>--model</code> from the command
          line.
        </li>
        <li>
          Reads the base URL from a <code>BASE_URL</code> environment variable
          instead of hardcoding <code>localhost</code>.
        </li>
      </ul>
      <p>Paste your full <code>loadtest.py</code> below:</p>
      <label for="${id}" class="form-label">loadtest.py:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="16"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
