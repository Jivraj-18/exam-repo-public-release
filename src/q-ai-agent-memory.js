import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-ai-agent-memory";
  const title = "AI Agent Memory Files";
  const answer = "CLAUDE.md";

  const question = html`
    <div class="mb-3">
      <p>
        The <strong>Claude Code CLI</strong> looks for a specific Markdown file in the 
        root of a repository to understand project-specific build commands, testing 
        patterns, and style guides. What is the exact <strong>filename</strong>?
      </p>
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" placeholder="FILENAME.md" />
    </div>
  `;

  return { id, title, weight, question, answer };
}