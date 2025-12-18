import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-strict-mode";
  const title = "JSON Schema Strictness";
  const answer = "additionalProperties";

  const question = html`
    <div class="mb-3">
      <p>
        When using OpenAI's <strong>Structured Outputs</strong> with <code>strict: true</code>, 
        every object in your JSON Schema must explicitly include one specific key set to 
        <code>false</code> to ensure the model does not hallucinate extra fields. 
        What is the name of this key?
      </p>
      <label for="${id}" class="form-label">Key Name:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. someField" />
    </div>
  `;

  return { id, title, weight, question, answer };
}