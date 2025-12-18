import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-llm-sqlite";
  const title = "llm CLI Database";

  const answer = "SQLite";

  const question = html`
    <div class="mb-3">
      <p>
        Simon Willison's <code>llm</code> CLI tool automatically logs every interaction 
        and audit trail into which specific <strong>database format</strong>?
      </p>
      <label for="${id}" class="form-label">Database Format:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}