import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { getUserFromStrong } from "./utils/user.js";

const expect = (cond, msg) => {
  if (!cond) throw new Error(msg);
};

async function fetchText(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Failed to fetch: ${url}`);
  return await r.text();
}

export default async function ({ user, weight = 1 }) {
  const { email, rollNumber } = getUserFromStrong();
  const id = "q-gha-wttr-yaml";
  const title = "GitHub Actions YAML: curl wttr.in and update README";

  const question = html`
    <div class="mb-3">
      <h4>GitHub Actions: Weather → README</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>
      <p>
        Create a GitHub Actions workflow YAML that:
      </p>
      <ol>
        <li>Runs on <code>workflow_dispatch</code> (manual trigger).</li>
        <li>Uses <code>curl</code> to fetch weather from <code>https://wttr.in/?format=3</code>.</li>
        <li>Updates <code>README.md</code> by writing the curl output into it (or a section of it).</li>
        <li>Commits and pushes the change back to the repo.</li>
      </ol>
      <p class="text-muted">
        Submit the <strong>raw URL</strong> to your workflow YAML file (e.g. in <code>.github/workflows/</code>).
        We will fetch the YAML and validate that it contains the required steps.
      </p>
      <label class="form-label" for="${id}">Raw URL to workflow YAML</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (yamlUrl) => {
    const url = String(yamlUrl || "").trim();
    expect(url, "Raw YAML URL is required");

    const y = await fetchText(url);

    // Basic workflow requirements (string checks)
    expect(/workflow_dispatch\s*:/i.test(y), "Workflow must include 'workflow_dispatch:' trigger");
    expect(/wttr\.in/i.test(y), "Workflow must curl wttr.in");
    expect(/\bcurl\b/i.test(y), "Workflow must use curl");
    expect(/README\.md/i.test(y), "Workflow must reference README.md");

    // Commit/push heuristics: either uses git directly or a commit action
    expect(
      /\bgit\s+commit\b/i.test(y) ||
        /\bgit\s+push\b/i.test(y) ||
        /EndBug\/add-and-commit/i.test(y) ||
        /stefanzweifel\/git-auto-commit-action/i.test(y),
      "Workflow must commit and push (git commit/push or a known auto-commit action)",
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
