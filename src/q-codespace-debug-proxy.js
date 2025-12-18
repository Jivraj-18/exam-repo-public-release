// q-codespace-debug-proxy.js
import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-codespace-debug-proxy";
  const title = "Codespace Debug Proxy";

  const answer =
    "Uses devcontainer with python feature and Actions workflow that prints ngrok HTTPS URL";

  const question = html`
    <div class="mb-3">
      <p>
        You are debugging a FastAPI app inside a GitHub Codespace and want to
        expose it temporarily for external testing. Set up:
      </p>
      <ul>
        <li>
          A <code>.devcontainer/devcontainer.json</code> using the
          <code>ghcr.io/devcontainers/features/python:1</code> feature.
        </li>
        <li>
          VS Code extensions
          <code>astral-sh.uv</code> and <code>ms-python.python</code>
          pre-installed.
        </li>
        <li>
          A <code>postCreateCommand</code> that installs
          <code>uv</code> and the app dependencies.
        </li>
        <li>
          A GitHub Actions workflow that starts an ngrok tunnel to the app
          running in the Codespace and prints the public HTTPS URL in the
          workflow logs.
        </li>
      </ul>
      <p>Paste both files below:</p>
      <label for="${id}-dev" class="form-label"
        >devcontainer.json:</label
      >
      <textarea
        class="form-control mb-3"
        id="${id}-dev"
        name="${id}-dev"
        rows="10"
      ></textarea>

      <label for="${id}-wf" class="form-label">Workflow YAML:</label>
      <textarea
        class="form-control"
        id="${id}-wf"
        name="${id}-wf"
        rows="12"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
