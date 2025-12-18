import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 2 }) {
  const id = "q-pydantic-ai-dynamic";
  const title = "AI Engineering: Validated Telemetry Extraction";
  const nonce = Math.random().toString(36).substring(7);

  const question = html`
    <div class="mb-3">
      <h4>Business Context: Unstructured IoT Ingestion</h4>
      <p>
        <strong>Aether IoT</strong> collects raw text logs from millions of legacy sensors. They use <b>Pydantic AI</b> to extract structured metrics. To prevent "Vibe Coding" hallucinations, their extraction pipeline uses a <b>Dynamic Nonce</b> to verify real-time processing.
      </p>
      <h5>Your Task</h5>
      <p>Submit a JSON object extracted from the following raw log entry:</p>
      <blockquote class="bg-light p-2 small">
        "LOG_ID: A7-99 | VOLT: 1.25V | STATUS: ACTIVE | NONCE: ${nonce}"
      </blockquote>
      <p><strong>Requirements:</strong></p>
      <ul>
        <li><code>voltage</code>: float</li>
        <li><code>is_active</code>: boolean</li>
        <li><code>verification_key</code>: The nonce provided in the log</li>
      </ul>
      <label for="${id}" class="form-label">Paste the Validated JSON Output</label>
      <textarea class="form-control" id="${id}" name="${id}" rows="3"></textarea>
    </div>
  `;

  const answer = async (input) => {
    const data = JSON.parse(input);
    if (data.verification_key !== nonce) throw new Error("Nonce mismatch! Ensure you processed the dynamic input correctly.");
    if (data.voltage !== 1.25) throw new Error("Incorrect voltage extraction.");
    return true;
  };

  return { id, title, weight, question, answer };
}