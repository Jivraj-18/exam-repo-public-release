import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-claude-artifact-log-analyzer";
  const title = "Claude Artifacts: Log Analyzer App";
  const answer = "Public Claude Artifacts URL";
  const question = html`
    <div class="mb-3">
      <p>
        Using <strong>Claude Artifacts</strong>, create and share an interactive app that
        accepts pasted server logs and <strong>highlights errors, warnings, and timestamps</strong>.
        The app should visually separate log levels and show a summary count.
      </p>
      <label for="${id}" class="form-label">Claude Artifacts URL:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;
  return { id, title, weight, question, answer };
}
