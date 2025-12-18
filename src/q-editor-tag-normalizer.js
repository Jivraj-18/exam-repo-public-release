import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as seedrandom } from "seedrandom";
import { download } from "./download.js";

export default async function({ user, weight = 1 }) {
  const id = "q-editor-tag-normalizer";
  const title = "Normalise incident tags";

  const random = seedrandom(`${user.email}#${id}`);

  const pick = (arr) => arr[Math.floor(random() * arr.length)];
  const randint = (min, max) => Math.floor(random() * (max - min + 1)) + min;

  const teams = [
    "Site Reliability",
    "ML Enablement",
    "Payments",
    "Data Platform",
    "Infra Ops",
    "Customer Success",
  ];

  const teamVariants = {
    "ML Enablement": ["ML Enablement", "ml enablement", "ML-Enablement", "Ml  Enablement", "ML_Enablement"],
    "Site Reliability": ["Site Reliability", "SRE", "site-reliability", "Site  Reliability"],
    Payments: ["Payments", "payments", "PAYMENTS"],
    "Data Platform": ["Data Platform", "data-platform", "DATA PLATFORM"],
    "Infra Ops": ["Infra Ops", "infra-ops", "InfraOps"],
    "Customer Success": ["Customer Success", "customer-success", "CS"],
  };

  const severities = ["Low", "Medium", "High", "Critical"];
  const severityVariants = {
    Low: ["Low", "low", "LOW"],
    Medium: ["Medium", "medium", "MEDIUM"],
    High: ["High", "high", "HIGH"],
    Critical: ["Critical", "critical", "CRITICAL"],
  };

  const statuses = ["OPEN", "CLOSED", "REOPENED", "ACKED"];
  const statusVariants = {
    OPEN: ["OPEN", "open"],
    CLOSED: ["CLOSED", "closed"],
    REOPENED: ["REOPENED", "reopened", "ReOpened"],
    ACKED: ["ACKED", "acked"],
  };

  const tagPools = [
    // API error variants
    ["API Error", "api error", "api-error", "api err", "API_ERR"],
    // auth variants
    ["AUTH", "Auth failure", "auth-failure", "authentication", "auth"],
    // rate-limit variants
    ["Rate Limit", "rate-limit", "rate limiting", "ratelimit"],
    // timeout variants
    ["Timeout", "time out", "request-timeout", "timeout"],
    // db variants
    ["DB", "db", "database", "db error", "db-error"],
    // cache variants
    ["Cache Miss", "cache-miss", "cache miss", "cache"],
  ];

  const tagDelims = [", ", " | ", " / ", " • ", " ; "];

  const normalizeTeam = (s) => {
    const cleaned = String(s)
      .toLowerCase()
      .replace(/[^a-z]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
    if (cleaned === "ml enablement") return "ML Enablement";
    if (cleaned === "site reliability" || cleaned === "sre") return "Site Reliability";
    if (cleaned === "data platform") return "Data Platform";
    if (cleaned === "payments") return "Payments";
    if (cleaned === "infra ops" || cleaned === "infraops") return "Infra Ops";
    if (cleaned === "customer success" || cleaned === "cs") return "Customer Success";
    return s.trim();
  };

  const normalizeSeverity = (s) => {
    const v = String(s).trim().toLowerCase();
    if (v === "critical") return "Critical";
    if (v === "high") return "High";
    if (v === "medium") return "Medium";
    if (v === "low") return "Low";
    return s.trim();
  };

  const normalizeTag = (raw) => {
    let t = String(raw).toLowerCase().trim();
    t = t.replace(/[_\s]+/g, "-");
    t = t.replace(/[^a-z0-9-]/g, "");
    t = t.replace(/-+/g, "-").replace(/^-+|-+$/g, "");
    // Canonicalize common variants
    if (t === "apierr" || t === "api-err" || t === "api-error") return "api-error";
    if (t === "api-error" || t === "api-error") return "api-error";
    if (t === "authentication" || t === "auth-failure" || t === "auth") return "auth";
    if (t === "rate-limiting" || t === "ratelimit") return "rate-limit";
    if (t === "request-timeout" || t === "time-out" || t === "timeout") return "timeout";
    if (t === "database" || t === "db-error" || t === "db") return "db";
    if (t === "cache-miss" || t === "cache") return "cache";
    return t;
  };

  const isSeverityAtLeastMedium = (sev) => {
    const order = { Low: 0, Medium: 1, High: 2, Critical: 3 };
    return (order[sev] ?? -1) >= order.Medium;
  };

  const owners = ["ppatel", "asaha", "rverma", "jdoe", "kshah", "nroy"];

  const lines = [];
  /** @type {Set<string>} */
  const expectedTags = new Set();

  const baseDate = new Date("2024-08-01T00:00:00Z");
  const totalIncidents = 140;

  for (let i = 0; i < totalIncidents; i++) {
    const inc = `INC-${240000 + i}`;
    const team = pick(teamVariants[pick(teams)]);
    const severity = pick(severityVariants[pick(severities)]);
    const status = pick(statusVariants[pick(statuses)]);
    const owner = pick(owners);
    const opened = new Date(baseDate.getTime() + randint(0, 35 * 24 * 60 * 60) * 1000);

    // Compose tags with noisy delimiters and duplicates
    const groupCount = randint(1, 3);
    const rawTags = [];
    for (let g = 0; g < groupCount; g++) {
      const pool = pick(tagPools);
      rawTags.push(pick(pool));
      if (random() < 0.35) rawTags.push(pick(pool)); // duplicate variant
    }
    const delim = pick(tagDelims);
    const tags = rawTags.join(delim);

    const line =
      `${inc} :: team=${team} :: severity = ${severity} :: status = ${status} :: tags = [` +
      `${tags}` +
      `] :: owner = ${owner} :: opened = ${opened.toISOString().replace(".000Z", "Z")} :: note: exported`;
    lines.push(line);

    // Compute expected tags for the filtered subset
    const canonicalTeam = normalizeTeam(team);
    const canonicalStatus = String(status).trim().toUpperCase() === "REOPENED" ? "REOPENED" : "OTHER";
    const canonicalSeverity = normalizeSeverity(severity);

    if (canonicalTeam === "ML Enablement" && canonicalStatus === "REOPENED" && isSeverityAtLeastMedium(canonicalSeverity)) {
      const inside = tags;
      for (const part of inside.split(/[,\|\/•;]+/)) {
        const normalized = normalizeTag(part);
        if (normalized) expectedTags.add(normalized);
      }
    }
  }

  // Guarantee at least 4 tags in the expected set for a non-trivial result.
  if (expectedTags.size < 4) {
    const forced = [
      `INC-249991 :: team=ML-Enablement :: severity = Critical :: status = REOPENED :: tags = [API Error | AUTH | Cache Miss] :: owner = ppatel :: opened = 2024-08-18T03:14:22Z :: note: escalated via pager`,
      `INC-249992 :: team=ml enablement :: severity = High :: status = reopened :: tags = [db error / rate limiting / timeout] :: owner = asaha :: opened = 2024-08-19T10:22:01Z :: note: retry storm`,
    ];
    for (const line of forced) lines.push(line);
    // Update expectedTags for forced lines
    ["api-error", "auth", "cache", "db", "rate-limit", "timeout"].forEach((t) => expectedTags.add(t));
  }

  const blob = new Blob([lines.join("\n") + "\n"], { type: "text/plain" });

  const answer = async (input) => {
    if (!input) throw new Error("Enter a number.");
    const n = Number(String(input).trim().replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(n)) throw new Error("Enter a valid number (count of distinct tags).");
    if (n !== expectedTags.size) {
      throw new Error(
        "Incorrect. Double-check: filter to REOPENED + ML Enablement + severity ≥ Medium; extract tags inside [...]; normalize to lowercase + hyphens; de-duplicate.",
      );
    }
    return true;
  };

  const question = html`
    <div class="mb-3">
      <h2>Incident tag normalisation for Cirrus Platform (offline export)</h2>
      <p>
        Cirrus Platform tracks incidents in a plain-text export. Analysts want a clean catalogue of canonical tags for
        reopened incidents handled by one team.
      </p>
      <p>Each line loosely follows this pattern:</p>
      <pre><code>INC-241923 :: team=Site Reliability :: severity = Critical :: status = REOPENED :: tags = [api error | AUTH] :: owner = ppatel :: opened = 2024-08-18 03:14:22 :: note: ...</code></pre>

      <h3>What you need to do (in a code editor)</h3>
      <ol>
        <li>Limit to incidents where <code>status</code> is <strong>REOPENED</strong> and <code>team</code> is <strong>ML Enablement</strong> (normalize team values first).</li>
        <li>Keep only rows where <code>severity</code> is at least <strong>Medium</strong> (i.e., Medium/High/Critical).</li>
        <li>Extract tag values inside <code>tags = [...]</code>.</li>
        <li>Split tags by commas, pipes, slashes, bullets, or semicolons.</li>
        <li>Normalize tags: lowercase, replace internal spaces/underscores with hyphens, remove punctuation, de-duplicate.</li>
        <li>Count how many <strong>distinct canonical tags</strong> appear.</li>
      </ol>

      <p>
        Download the incident log:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => download(blob, `${id}.txt`)}>
          ${id}.txt
        </button>
      </p>

      <label for="${id}" class="form-label">
        How many distinct canonical tags appear after filtering and normalization?
      </label>
      <input class="form-control" id="${id}" name="${id}" inputmode="numeric" required />
      <p class="text-muted">
        Tip: You can do this with regex find/replace + multi-cursor edits + sort + de-dup, or with a quick script.
      </p>
    </div>
  `;

  return { id, title, weight, question, answer };
}


