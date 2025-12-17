import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ga4-json-schema";
  const title = "Structured Output Constraint";

  const answer = "additionalProperties";

  const question = html`
    <div class="mb-3">
      <p>
        In GA4 structured output questions,
        which JSON Schema property must be set to
        <code>false</code> for <strong>every object</strong>
        to prevent the model from returning extra fields?
      </p>
      <label for="${id}" class="form-label">Property name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
