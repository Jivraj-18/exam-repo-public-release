import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ai-eval-yaml";
  const title = "AI Evaluation Scorecard";

  const answer = `criteria:
  correctness:
    weight: 0.5
    pass_threshold: 0.8
  security:
    weight: 0.3
    pass_threshold: 0.9
  readability:
    weight: 0.2
    pass_threshold: 0.7
fail_on_any_below_threshold: true`;

  const question = html`
    <div class="mb-3">
      <p>
        Design a <strong>minimal YAML evaluation scorecard</strong> for
        AI-generated code.
      </p>
      <p>
        Include criteria for <strong>correctness</strong>,
        <strong>security</strong>, and <strong>readability</strong>.
      </p>
      <p>
        The submission must fail if any criterion is below its threshold.
      </p>
      <label for="${id}" class="form-label">YAML:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
