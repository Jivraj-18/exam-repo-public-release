import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "https://cdn.jsdelivr.net/npm/seedrandom@3.0.5/+esm";

export default async function ({ user, weight = 1 }) {
  const id = "q-parse-partial-json";
  const title = "Parse Partial JSON";

  const random = seedrandom(`${user.email}#${id}`);

  // Deterministic numeric payload per user
  const a = Math.floor(10 + random() * 40);
  const b = Math.floor(20 + random() * 50);
  const c = Math.floor(5 + random() * 25);

  const jsonPayload = `{
  "metrics": {
    "clicks": ${a},
    "views": ${b},
    "errors": ${c}
  }
}`;

  // Corrupted / partial response (realistic API failure)
  const rawResponse = `
INFO 2024-03-18T10:42:11Z request_id=ab12
${jsonPayload}
WARN unexpected EOF while streaming response
socket closed by peer
`;

  // What the student must compute
  const answer = a + b - c;

  const question = html`
    <div class="mb-3">
      <p>
        You are consuming data from an unreliable API. The response contains
        <strong>logs mixed with a partial JSON object</strong>.
      </p>

      <p>
        Your task is to <strong>extract and parse the valid JSON portion</strong>
        and compute a derived metric.
      </p>

      <h6>Raw API Response</h6>
      <pre><code class="language-text">${rawResponse}</code></pre>

      <h6>Task</h6>
      <ol>
        <li>Extract the valid JSON object from the response</li>
        <li>Parse it using a proper JSON parser</li>
        <li>
          Compute:
          <pre><code>clicks + views − errors</code></pre>
        </li>
      </ol>

      <p class="text-muted">
        Notes:
        <ul>
          <li>You may assume the JSON itself is valid</li>
          <li>Do <strong>not</strong> assume the response is valid JSON end-to-end</li>
          <li>Ignore all log lines</li>
        </ul>
      </p>

      <label for="${id}" class="form-label">
        What is the computed value?
      </label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
