import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-context-memory";
  const title = "Persistent AI Project Context";

  const answer = "CLAUDE.md";

  const question = html`
    <div class="mb-3">
      <p>
        In a repository that uses an AI coding agent repeatedly,
        you want to provide <strong>persistent, version-controlled
        instructions</strong> describing build steps, testing rules,
        and coding conventions.
      </p>
      <p>
        Which <strong>project-level context file</strong> is used
        by Claude Code to store this long-term guidance?
      </p>
      <label for="${id}" class="form-label">File name:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
