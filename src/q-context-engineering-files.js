import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-context-file";
  const title = "Persistent Agent Context";

  const answer = "CLAUDE.md";

  const question = html`
    <div class="mb-3">
      <p>
        Which file is used by Claude Code to provide
        <strong>persistent project instructions</strong>
        across multiple CLI sessions?
      </p>
      <label for="${id}" class="form-label">Filename:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
