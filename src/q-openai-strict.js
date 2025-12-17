import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-openai-strict";
  const title = "OpenAI Function Calling Strict Mode";

  const answer = "additionalProperties";

  const question = html`
    <div class="mb-3">
      <p>
        When defining a JSON Schema for OpenAI Structured Outputs or Function Calling 
        with <code>strict: true</code>, which specific boolean property must be set to 
        <code>false</code> for every object in your schema to prevent the model from 
        hallucinating extra fields?
      </p>
      <label for="${id}" class="form-label">Property Name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}