import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-agent-determinism";
  const title = "Agent Determinism";

  const answer = "tests";

  const question = html`
    <div class="mb-3">
      <p>
        AI coding agents often produce different outputs for the same task.
        In production systems, what is the <strong>primary mechanism</strong>
        used to enforce deterministic acceptance of agent output?
      </p>
      <label for="${id}" class="form-label">One-word answer:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
