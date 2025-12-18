import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-claude-memory";
  const title = "Claude Code Memory File";

  const answer = "CLAUDE.md";

  const question = html`
    <div class="mb-3">
      <p>
        When using the Claude Code CLI, what is the specific filename used to store 
        project context, build instructions, and coding conventions?
      </p>
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}