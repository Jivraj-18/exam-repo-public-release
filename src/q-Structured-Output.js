import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-strict";
  const title = "Structured Outputs";

  const answer = "additionalProperties false";

  const question = html`
    <div class="mb-3">
      <p>
        In OpenAI Structured Outputs, which JSON Schema setting
        <strong>prevents the model from adding extra fields</strong>?
      </p>
      <label for="${id}" class="form-label">Schema keyword:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
