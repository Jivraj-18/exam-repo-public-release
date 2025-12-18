import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-determinism";
  const title = "Deterministic LLM Pipelines";

  const answer = "--schema";

  const question = html`
    <div class="mb-3">
      <p>
        You are using the <code>llm</code> CLI inside a CI pipeline.
        The output must be <strong>machine-parseable</strong> and
        fail if the model deviates from the expected structure.
      </p>
      <p>
        Which <strong>llm CLI flag</strong> enforces structured output validation
        to guarantee deterministic downstream processing?
      </p>
      <label for="${id}" class="form-label">Flag:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
