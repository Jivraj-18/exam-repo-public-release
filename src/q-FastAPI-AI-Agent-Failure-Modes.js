import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-agent-timeout";
  const title = "Agent Execution Safety";

  const answer = "timeout";

  const question = html`
    <div class="mb-3">
      <p>
        When exposing an AI coding agent through a web API,
        long-running executions can exhaust server resources.
      </p>
      <p>
        What control mechanism is commonly enforced to prevent this?
      </p>
      <label for="${id}" class="form-label">One-word answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
