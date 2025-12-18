import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-cli-approvals";
  const title = "AI CLI Approval Modes";

  const answer = "Read Only";

  const question = html`
    <div class="mb-3">
      <p>
        While reviewing an unfamiliar repository, you want an AI CLI agent
        (Codex / Claude Code style) to <strong>inspect files and diffs</strong>
        but <strong>never modify the file system or run commands</strong>.
      </p>
      <p>
        Which <strong>approval mode</strong> should be enabled to guarantee
        zero side effects?
      </p>
      <label for="${id}" class="form-label">Approval mode:</label>
      <input class="form-control" id="${id}" name="${id}" />
    </div>
  `;

  return { id, title, weight, question, answer };
}
