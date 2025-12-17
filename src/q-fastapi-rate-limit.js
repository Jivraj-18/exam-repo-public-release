import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

/**
 * FastAPI Rate Limiting Question
 * Weight: 1
 * Chapter: Deployment / Backend Guardrails
 */

export default async function ({ user, weight = 1 }) {
  const id = "q-fastapi-rate-limit";
  const title = "API Rate Limiting with FastAPI";

  const question = html`
    <div class="mb-3">
      <h4>API Rate Limiting with FastAPI</h4>

      <p>
        You are building a <strong>public analytics API</strong> that must protect itself
        from abusive clients.
      </p>

      <p><strong>Your task:</strong></p>
      <ul>
        <li>Implement a FastAPI application</li>
        <li>Apply <strong>rate limiting per client IP</strong></li>
        <li>Allow a maximum of <strong>5 requests per minute</strong></li>
        <li>If the limit is exceeded:
          <ul>
            <li>Return HTTP <code>429 Too Many Requests</code></li>
            <li>Return JSON: <code>{"error": "rate limit exceeded"}</code></li>
          </ul>
        </li>
        <li>Use <strong>in-memory storage only</strong> (dictionary / cache)</li>
        <li><strong>Do NOT</strong> use external rate-limiting libraries</li>
        <li>Implementation must work correctly with concurrent requests</li>
      </ul>

      <p>
        You may submit <strong>either</strong>:
      </p>
      <ol>
        <li>A publicly accessible endpoint URL</li>
        <li>OR the exact command you used to test it locally (e.g. curl / ab / hey)</li>
      </ol>

      <label for="${id}" class="form-label mt-2">
        Endpoint URL or local test command
      </label>
      <input
        id="${id}"
        name="${id}"
        class="form-control"
        type="text"
        placeholder="http://localhost:8000/ | curl http://localhost:8000"
      />

      <p class="text-muted mt-2">
        We will verify behavior by issuing multiple requests within a minute
        and checking for correct <code>429</code> responses.
      </p>
    </div>
  `;

  const answer = async (input) => {
    if (!input || !input.trim()) {
      throw new Error("You must provide an endpoint URL or a test command.");
    }

    const text = input.toLowerCase();

    // Light semantic validation (not over-restrictive)
    const looksLikeUrl =
      text.startsWith("http://") || text.startsWith("https://");

    const looksLikeCommand =
      text.includes("curl") ||
      text.includes("hey") ||
      text.includes("ab ") ||
      text.includes("http");

    if (!looksLikeUrl && !looksLikeCommand) {
      throw new Error(
        "Input must be a valid URL or a reasonable command used to test rate limiting."
      );
    }

    return true;
  };

  return {
    id,
    title,
    weight,
    question,
    answer,
  };
}
