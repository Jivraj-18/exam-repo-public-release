import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-idempotent-pipeline";
  const title = "Incremental & Idempotent Pipelines";

  const answer = "idempotency";

  const question = html`
    <div class="mb-3">
      <p>
        What property of a data pipeline ensures that re-running it multiple times
        does <strong>not</strong> create duplicate records?
      </p>
      <label for="${id}" class="form-label">Property:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
