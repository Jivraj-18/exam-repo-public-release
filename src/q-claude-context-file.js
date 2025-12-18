import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-claude-md";
  const title = "Claude Project Context";

  const answer = "CLAUDE.md";

  const question = html`
    <div class="mb-3">
      <p>
        In the section on Project Context, what is the specific <strong>filename</strong> 
        that Claude Code uses to store persistent knowledge, build instructions, and 
        coding conventions for a project?
      </p>
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g. README.md" />
    </div>
  `;

  return { id, title, weight, question, answer };
}