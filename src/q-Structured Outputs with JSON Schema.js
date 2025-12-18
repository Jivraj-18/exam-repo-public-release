import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-structured-output";
  const title = "LLM: Structured Output Enforcement";

  const answer = `"additionalProperties": false`;

  const question = html`
    <div class="mb-3">
      <p>
        You are defining a JSON Schema for OpenAI Structured Outputs.
        The API must reject any extra fields not defined in the schema.
      </p>
      <p>
        Which exact JSON property enforces this restriction?
      </p>
      <label for="${id}" class="form-label">Exact JSON line:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
