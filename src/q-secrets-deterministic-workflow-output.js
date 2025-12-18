import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-secrets-deterministic-workflow-output";
  const title = "GitHub Actions – Secrets and Deterministic Output";

  const answer = async (repoUrl) => {
    repoUrl = repoUrl.trim();

    // Basic validation only (manual inspection is expected)
    if (!repoUrl.startsWith("https://github.com/")) {
      throw new Error("Please enter a valid GitHub repository URL");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Secure CI/CD Workflow for DataOps</h2>

      <p>
        You are working on a DataOps team that uses <strong>GitHub Actions</strong>
        to automate workflows. Some workflows require sensitive configuration
        values such as API tokens or credentials.
      </p>

      <p>
        To ensure security, these values must be stored as
        <strong>GitHub repository secrets</strong> and never printed directly
        in logs.
      </p>

      <h3>Your Task</h3>

      <ol>
        <li>
          Create a GitHub Actions workflow in one of your repositories that can
          be triggered using <code>workflow_dispatch</code>.
        </li>
        <li>
          Add a repository secret named <code>SECRET_TOKEN</code>.
        </li>
        <li>
          In the workflow:
          <ul>
            <li>Read the secret using <code>secrets.SECRET_TOKEN</code></li>
            <li>Expose it as an environment variable</li>
            <li>
              Print <strong>only the length of the secret</strong>
              (not the secret itself)
            </li>
          </ul>
        </li>
        <li>
          The workflow must <strong>fail</strong> if the secret is missing.
        </li>
        <li>
          Trigger the workflow and ensure the most recent run succeeds.
        </li>
      </ol>

      <p>
        After completing the above steps, enter the URL of your GitHub repository
        below.
      </p>

      <label for="${id}" class="form-label">
        What is your GitHub repository URL?
      </label>

      <input
        class="form-control"
        id="${id}"
        name="${id}"
        type="url"
        placeholder="https://github.com/USER/REPOSITORY"
        required
      />
    </div>
  `;

  return { id, title, weight, question, answer };
}
