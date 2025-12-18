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
  const id = "q-gha-crypto-rate-sx-daily";
  const title = "GitHub Actions: Daily crypto prices (rate.sx) → README.md";

  const question = html`
    <div class="mb-3">
      <h4>GitHub Actions Cron: rate.sx → README</h4>
      <p>You are logged in as <strong>${email}</strong> (roll: <strong>${rollNumber}</strong>).</p>

      <p>
        Create a GitHub Actions workflow YAML file in a GitHub repository that runs <strong>daily</strong> using a
        <code>schedule</code> (cron) trigger.
      </p>

      <p>The workflow must:</p>
      <ol>
        <li>Use <code>curl</code> to fetch crypto prices from <code>https://rate.sx</code> (any valid endpoint is OK).</li>
        <li>Write the curl output into <code>README.md</code> (either overwrite or update a section).</li>
        <li>Commit and push the updated <code>README.md</code> back to the repo.</li>
      </ol>

      <p class="text-muted">
        Submit the <strong>raw URL</strong> to the workflow YAML (usually in <code>.github/workflows/</code>).
        We will fetch the YAML and validate it contains a cron schedule, curl rate.sx, README.md update, and commit+push.
      </p>

      <label class="form-label" for="${id}">Raw URL to workflow YAML</label>
      <input class="form-control" id="${id}" name="${id}" type="url" />
    </div>
  `;

  const answer = async (yamlUrl) => {
    const url = String(yamlUrl || "").trim();
    expect(url, "Raw YAML URL is required");

    const y = await fetchText(url);

    // Must have schedule cron
    expect(/schedule\s*:/i.test(y), "Workflow must include a schedule trigger");
    expect(/cron\s*:/i.test(y), "Workflow schedule must include cron");

    // Must curl rate.sx
    expect(/\brate\.sx\b/i.test(y), "Workflow must reference rate.sx");
    expect(/\bcurl\b/i.test(y), "Workflow must use curl");

    // Must update README.md
    expect(/README\.md/i.test(y), "Workflow must reference README.md");

    // Must commit + push (git or action)
    expect(
      /\bgit\s+commit\b/i.test(y) ||
        /\bgit\s+push\b/i.test(y) ||
        /stefanzweifel\/git-auto-commit-action/i.test(y) ||
        /EndBug\/add-and-commit/i.test(y),
      "Workflow must commit and push changes (git commit/push or a known auto-commit action)",
    );

    return true;
  };

  return { id, title, weight, question, answer };
}
