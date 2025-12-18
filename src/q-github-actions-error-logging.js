import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-github-actions-error-logging";
  const title = "GitHub Actions – Scheduled Logging Workflow";

  const answer = async (repoUrl) => {
    repoUrl = repoUrl.trim();

    if (!repoUrl.startsWith("https://github.com/")) {
      throw new Error("Please enter a valid GitHub repository URL");
    }

    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Daily Workflow Logging for DevSync</h2>

      <p>
        DevSync Solutions wants to keep an auditable log of automated CI runs across projects.
        They require a workflow that logs <strong>success</strong> or <strong>failure</strong>
        to a file inside the repository every day.
      </p>

      <h3>Your Task</h3>

      <p>
        Create a GitHub Actions workflow in one of your repositories that:
      </p>

      <ol>
        <li>
          Lives in:
          <pre>.github/workflows/</pre>
        </li>

        <li>
          Runs <strong>daily</strong> with cron syntax specifying both
          <strong>hour and minute</strong>.
        </li>

        <li>
          Includes a step named:
          <pre>log-run-23ds2000079</pre>
        </li>

        <li>
          That step must append this format to a file named
          <code>workflow-runs.log</code>:
          <pre>
timestamp:&lt;ISO_DATETIME&gt; status:success
          </pre>
        </li>

        <li>
          A second step named:
          <pre>on-fail-23ds2000079</pre>
          must run only if the first step fails
          using <code>if: failure()</code>.
        </li>

        <li>
          That fail step must append to the same file:
          <pre>
timestamp:&lt;ISO_DATETIME&gt; status:failed
          </pre>
        </li>

        <li>
          The workflow must commit <code>workflow-runs.log</code>
          back to the repository on every run.
        </li>
      </ol>

      <p>
        Trigger the workflow manually once and confirm:
      </p>

      <ul>
        <li>The workflow appears as the most recent run</li>
        <li><code>workflow-runs.log</code> exists in the repository</li>
        <li>At least one timestamp entry is recorded</li>
      </ul>

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
