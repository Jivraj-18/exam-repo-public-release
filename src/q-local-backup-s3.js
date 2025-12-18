import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function ({ user, weight = 1 }) {
  const id = "q-local-backup-s3";
  const title = "S3 Backup GitHub Action";

  const answer = "backup-logs.yml"; // whatever canonical answer you want

  const question = html`
    <div class="mb-3">
      <p>
        You maintain a small FastAPI analytics service that stores daily CSV
        exports on local disk. Draft a GitHub Actions workflow that:
      </p>
      <ul>
        <li>Runs on a schedule.</li>
        <li>
          Uses OIDC to upload CSV exports from the last 7 days to an
          S3-compatible bucket (name and region stored as secrets).
        </li>
        <li>Appends a line to <code>backup-log.jsonl</code> for each upload.</li>
      </ul>
      <p>Paste your workflow YAML below:</p>
      <label for="${id}" class="form-label">Workflow YAML:</label>
      <textarea
        class="form-control"
        id="${id}"
        name="${id}"
        rows="10"
      ></textarea>
    </div>
  `;

  return { id, title, weight, question, answer };
}
