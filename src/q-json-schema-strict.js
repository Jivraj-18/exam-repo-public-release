import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-json-schema-strict";
  const title = "OpenAI Structured Outputs Requirement";

  const answer = "additionalProperties";

  const question = html`
    <div class="mb-3">
      <p>
        When using OpenAI's Structured Outputs feature with JSON Schema,
        there is a specific property that <strong>must be set to false</strong>
        for every object in your schema to ensure strict adherence.
      </p>
      <p>
        What is the name of this required property?
      </p>
      <label for="${id}" class="form-label">Property name:</label>
      <input 
        class="form-control" 
        id="${id}" 
        name="${id}" 
        placeholder="Enter property name (camelCase)" 
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}

