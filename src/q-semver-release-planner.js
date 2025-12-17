import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;
const pick = (random, arr) => arr[randInt(random, 0, arr.length - 1)];

const bumpVersion = (version, commits) => {
  const [major, minor, patch] = version.split(".").map((n) => Number.parseInt(n, 10));
  const hasBreaking = commits.some((c) => c.breaking || c.type.includes("!"));
  const hasFeature = commits.some((c) => c.type === "feat");
  if (hasBreaking) return `${major + 1}.0.0`;
  if (hasFeature) return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

export default async function({ user, weight = 1 }) {
  const id = "q-semver-release-planner";
  const title = "Plan the Next Semantic Version";
  const random = seedrandom(`${user.email}#${id}`);

  const baseVersion = `${randInt(random, 0, 2)}.${randInt(random, 1, 7)}.${randInt(random, 0, 9)}`;

  const commitPool = [
    { type: "feat", scope: "auth", desc: "Add device-bound session tokens" },
    { type: "feat", scope: "api", desc: "Expose async export endpoint" },
    { type: "fix", scope: "billing", desc: "Correct proration rounding" },
    { type: "chore", scope: "deps", desc: "Bump lint tooling" },
    { type: "refactor", scope: "ingest", desc: "Split ETL workers" },
    { type: "docs", scope: "playbook", desc: "Clarify on-call steps" },
    { type: "feat!", scope: "contracts", desc: "Rename webhook payload shape" },
    { type: "fix", scope: "api", desc: "Handle 429 retries" },
    { type: "perf", scope: "queries", desc: "Add covering index" },
  ];

  const commits = Array.from({ length: 5 }, () => pick(random, commitPool));
  const expected = bumpVersion(baseVersion, commits);

  const question = html`
    <div class="mb-3">
      <h4>CI/CD: Semantic Version Plan</h4>
      <p>
        Your release pipeline follows <strong>SemVer</strong>: bump <strong>major</strong> for any breaking change
        (<code>type</code> contains <code>!</code>), bump <strong>minor</strong> if there is at least one
        <code>feat</code>, otherwise bump <strong>patch</strong>.
      </p>
      <p>Starting version: <code>${baseVersion}</code></p>
      <p>Commits in the release train:</p>
      <ul>
        ${commits.map((c) => html`<li><code>${c.type}</code> (${c.scope}) — ${c.desc}</li>`)}
      </ul>
      <p class="mb-2">What should the next version be?</p>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., 1.4.0" />
      <div class="form-text">Use <code>MAJOR.MINOR.PATCH</code> numeric format.</div>
    </div>
  `;

  const answer = (input) => {
    if (!input) throw new Error("Version is required");
    const candidate = String(input).trim();
    if (!/^\d+\.\d+\.\d+$/.test(candidate)) throw new Error("Use numeric semver like 1.2.3");
    return candidate === expected;
  };

  return { id, title, weight, question, answer };
}
