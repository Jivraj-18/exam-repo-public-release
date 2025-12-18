import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";

export default async function({ user, weight = 1 }) {
  const id = "q-cicd-audit";
  const title = "CI/CD: Automated Documentation Audit";
  const auditId = Math.random().toString(36).substring(2, 8).toUpperCase();

  const question = html`
    <div class="mb-3">
      <h4>Documentation as Code (DaC)</h4>
      <p>
        <strong>Stellar Cloud</strong> enforces strict documentation standards. Every repository must deploy an automated audit page via <b>GitHub Actions</b> to <b>GitHub Pages</b> that proves the CI/CD pipeline is active and authorized.
      </p>
      <h5>Deployment Requirements</h5>
      <ol>
        <li><strong>Workflow:</strong> Create a GitHub Action that triggers on push.</li>
        <li><strong>Artifact:</strong> The workflow must generate a file <code>audit.json</code>.</li>
        <li><strong>Payload:</strong> The file must contain: <code>{"audit_code": "${auditId}", "owner": "anonymous"}</code>.</li>
        <li><strong>Hosting:</strong> The file must be publicly accessible via your GitHub Pages root.</li>
      </ol>
      <label for="${id}" class="form-label">URL of your deployed <code>audit.json</code></label>
      <input class="form-control" id="${id}" name="${id}" type="url" placeholder="https://user.github.io/repo/audit.json" />
    </div>
  `;

  const answer = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.audit_code !== auditId) throw new Error(`Audit code mismatch. Expected ${auditId}, found ${data.audit_code}`);
    return true;
  };

  return { id, title, weight, question, answer };
}