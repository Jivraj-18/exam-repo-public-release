import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1.25 }) {
  const id = "q-llm-structured-json";
  const title = "Structured LLM Output";

  const answer = JSON.stringify({
    incident: true,
    affected_regions: ["EU"],
    recovery_minutes: 10,
    summary:
      "A deployment caused an incident affecting the EU region and was resolved within minutes.",
  });

  const question = html`
    <div class="mb-3">
      <p>
        An LLM analyzes the following text:
      </p>
      <pre>
System latency increased sharply after deployment.
Error rates spiked in the EU region,
while APAC remained stable.
A rollback restored metrics within 10 minutes.
      </pre>
      <p>
        Return a <strong>strict JSON object only</strong> with:
        <code>incident</code>, <code>affected_regions</code>,
        <code>recovery_minutes</code>, and <code>summary</code>.
      </p>
      <label for="${id}" class="form-label">JSON output:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
