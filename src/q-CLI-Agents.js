import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-trust-boundary";
  const title = "Trust Boundaries in CLI Agents";

  const answer = "approvals";

  const question = html`
    <div class="mb-3">
      <p>
        Modern CLI coding agents restrict destructive operations
        (file deletion, shell execution, deployments).
      </p>
      <p>
        What mechanism is typically required before such actions are executed?
      </p>
      <label for="${id}" class="form-label">Answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
