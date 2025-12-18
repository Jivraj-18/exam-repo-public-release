import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-json-extraction";
  const title = "LLM: Structured Extraction";

  const expectedKeys = ["issue_type", "sentiment", "urgency"];

  const answer = (value) => {
    const decoded = atob(value);
    const obj = JSON.parse(decoded);
    expectedKeys.forEach((k) => {
      if (!(k in obj)) throw new Error(`Missing key: ${k}`);
    });
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Support Ticket Classification</h2>
      <p>
        Use an LLM to extract structured fields from a customer complaint.
      </p>

      <pre>
Customer message:
"My payment failed twice and this is extremely frustrating."
      </pre>

      <h2>Your Task</h2>
      <ol>
        <li>Extract <code>issue_type</code>, <code>sentiment</code>, <code>urgency</code></li>
        <li>Return valid JSON only</li>
        <li>Base64 encode the JSON</li>
      </ol>

      <label class="form-label">Base64-encoded JSON:</label>
      <input class="form-control" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
