import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-markitdown";
  const title = "CLI: Convert PDF to Markdown (markitdown)";

  const answer = "PYTHONUTF8=1 uvx markitdown file.pdf > out.md";

  const question = html`
    <div class="mb-3">
      <p><strong>Question name:</strong> ${title}</p>
      <p>
        Write a command that converts <code>file.pdf</code> to Markdown using
        <code>markitdown</code> and saves it to <code>out.md</code>.
      </p>
      <p class="text-muted mb-1">
        Include <code>PYTHONUTF8=1</code> in the command.
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
