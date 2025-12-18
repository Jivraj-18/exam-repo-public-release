import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-structured-output";
  const title = "LLM Structured Outputs";

  const answer = "json_schema";

  const question = html`
    <div class="mb-3">
      <p>
        OpenAI provides a feature that ensures a language model’s response
        strictly follows a predefined JSON format by validating it against
        a schema.
      </p>
      <p>
        In the Chat Completions API, what is the value of the
        <code>response_format.type</code> field used to enable this behavior?
      </p>
      <p class="text-muted">
        Answer with the exact identifier used in the API.
      </p>
      <label for="${id}" class="form-label">response_format.type:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
