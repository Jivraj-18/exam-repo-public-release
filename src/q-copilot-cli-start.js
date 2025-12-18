import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-copilot-cli-start";
  const title = "GitHub Copilot CLI: Start Session";

  const answer = "copilot";

  const question = html`
    <div class="mb-3">
      <p>
        Assuming GitHub Copilot CLI is installed globally as
        <code>@github/copilot</code>, which single
        <strong>terminal command</strong> starts an interactive Copilot
        CLI coding session from the current repository?
      </p>
      <label for="${id}" class="form-label">Command:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
