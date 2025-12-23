import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-structured-outputs";
  const title = "Structured Output Enforcement";

  const answer = "json_schema";

  const question = html`
    <div class="mb-3">
      <p>
        Which <strong>response_format type</strong> ensures that an LLM output
        strictly follows a predefined JSON schema without missing or hallucinated fields?
      </p>
      <label for="${id}" class="form-label">response_format.type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
