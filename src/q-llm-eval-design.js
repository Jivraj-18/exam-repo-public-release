import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-eval-design";
  const title = "LLM Eval – Evaluation Design";

  const answer = "contains-all + llm-rubric";

  const question = html`
    <div class="mb-3">
      <p>
        You are evaluating multiple LLMs using PromptFoo.
        The task is:
      </p>

      <blockquote>
        "Generate a curl command that fetches the top 10 repositories of an
        organization sorted by stars."
      </blockquote>

      <p>
        The evaluation must ensure:
      </p>

      <ul>
        <li>The command is syntactically valid</li>
        <li>The correct GitHub API endpoint is used</li>
        <li>The logic (sorting + limit) is correct</li>
      </ul>

      <p>
        Which evaluation strategy is the <strong>most reliable</strong> for this task?
      </p>

      <label class="form-label">
        Answer using assertion names (e.g. <code>contains-all</code>, <code>equals</code>, <code>llm-rubric</code>)
      </label>

      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
