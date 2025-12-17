import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cursor-composer";
  const title = "Cursor Composer Multi-File Refactoring";

  const answer = "Ctrl+I";

  const question = html`
    <div class="mb-3">
      <p>
        You need to use Cursor's <strong>Composer (Agent mode)</strong> to refactor
        authentication logic across multiple files in your codebase. The agent should
        automatically find relevant files, apply changes, and maintain consistency.
      </p>
      <p>
        According to the AI Coding in IDEs module, what is the keyboard shortcut to
        activate Cursor's Composer mode?
      </p>
      <label for="${id}" class="form-label">Keyboard shortcut:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., Ctrl+K" />
    </div>
  `;

  return { id, title, weight, question, answer };
}