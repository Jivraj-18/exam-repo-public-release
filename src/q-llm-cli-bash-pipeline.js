import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 0.5 }) {
  const id = "llm_cli_bash_pipeline";
  const title = "AI Coding CLI: Bash Pipeline with llm";

  const answer = "llm";

  const question = html`
    <div class="mb-3">
      <p>
        Write a <strong>bash pipeline</strong> that reads <code>data.csv</code>
        and converts it into a GitHub-flavored Markdown table using
        Simon Willison’s <code>llm</code> CLI tool.
      </p>
      <label for="${id}" class="form-label">Bash command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
