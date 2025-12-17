import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ai-ci";
  const title = "AI-Aware CI Signal";

  const answer = "pytest";

  const question = html`
    <div class="mb-3">
      <p>
        Which Python testing framework is explicitly recommended
        for validating <strong>AI-generated code</strong>
        before merging in CI pipelines?
      </p>
      <label for="${id}" class="form-label">Framework:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
