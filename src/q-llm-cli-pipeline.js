import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 2 }) {
  const id = "q-llm-cli-pipeline";
  const title = "LLM CLI Unix Pipeline Reasoning";

  const answer = "llm";

  const question = html`
    <div class="mb-3">
      <p>
        You are building a <strong>Unix-style AI-assisted pipeline</strong> where:
      </p>
      <ul>
        <li>Command-line output is produced by standard Unix tools</li>
        <li>The output is <strong>piped directly</strong> into a language model</li>
        <li>No temporary files are created</li>
        <li>The AI analyzes or summarizes the streamed input</li>
      </ul>

      <p>
        In the GA3 toolchain, which <strong>single CLI tool</strong> enables this
        pattern by integrating large language models directly into Unix pipelines?
      </p>

      <p class="text-muted">
        Answer with the exact command name used in the terminal.
      </p>

      <label for="${id}" class="form-label">CLI tool:</label>
      <input
        class="form-control"
        id="${id}"
        name="${id}"
        placeholder="Enter command name"
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
