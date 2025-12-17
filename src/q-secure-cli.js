import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-sandbox";
  const title = "Sandboxed CLI Execution";

  const answer = "codex exec";

  const question = html`
    <div class="mb-3">
      <p>
        Which OpenAI Codex CLI subcommand runs a task in a
        <strong>non-interactive sandbox</strong> suitable for CI pipelines?
      </p>
      <label for="${id}" class="form-label">Subcommand:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
