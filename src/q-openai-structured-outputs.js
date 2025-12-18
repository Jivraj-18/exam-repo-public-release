import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-struct-json";
  const title = "Structured Outputs Requirements";

  const answer = "false";

  const question = html`
    <div class="mb-3">
      <p>
        When defining a JSON Schema for OpenAI's <strong>Structured Outputs</strong> 
        (setting <code>strict: true</code>), you must explicitly set a specific property 
        on all objects to ensure no unknown fields are generated.
      </p>
      <p>
        What boolean value must <code>additionalProperties</code> be set to?
      </p>
      <label for="${id}" class="form-label">Value (true/false):</label>
      <input type="text" class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}