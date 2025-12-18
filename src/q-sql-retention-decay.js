import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

// ---------------- Agent validation ----------------
const allowedAgents = [
  "copilot",
  "github",
  "claude",
  "codex",
  "gemini",
  "cursor",
  "windsurf",
  "replit",
  "aider",
  "bolt",
];

const verifyAgent = (agent) => {
  const value = String(agent || "").toLowerCase();
  if (!value.trim()) throw new Error("Agent field is required");
  if (!allowedAgents.some((a) => value.includes(a))) {
    throw new Error("Agent must mention a known CLI coding agent");
  }
};

// ---------------- Output validation ----------------
const expectNonEmptyString = (output) => {
  if (!String(output).trim()) {
    throw new Error("Output must contain a region name");
  }
};

// ---------------- Task factory ----------------
const taskFactories = [
  () => ({
    id: "sql-retention-decay",
    description:
      "Write and run a SQL query that computes month-over-month retention decay per region using a window function (LAG). Print the region with the largest single-month negative decay.",
    validate: expectNonEmptyString,
    summary: "the region with the largest retention decay",
  }),
];

// ---------------- Helpers ----------------
const buildTaskUrl = (url, q) => {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("q", q);
    return parsed.toString();
  } catch {
    throw new Error("Invalid URL");
  }
};

// ---------------- Main export ----------------
export default async function ({ user, weight = 1 }) {
  const id = "q-sql-retention-decay";
  const title = "Agent Delegation: SQL Retention Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Delegating SQL Analytics to a CLI Agent</h4>

      <p>
        Your agent may use SQLite, DuckDB, or PostgreSQL locally to complete the task.
      </p>

      <p><strong>Task:</strong></p>
      <code class="d-block my-2">${task.description}</code>

      <label class="form-label">
        Enter the full URL of your <code>/task</code> endpoint
      </label>
      <input class="form-control" id="${id}" type="url" />

      <p class="text-muted">
        We will validate the agent identity, your email, and the correctness of
        the returned region.
      </p>
    </div>
  `;

  const answer = async (url) => {
    if (!url) throw new Error("Endpoint URL is required");

    const resp = await fetch(buildTaskUrl(url, task.description));
    if (!resp.ok) throw new Error("Endpoint did not return 200 OK");

    const data = await resp.json();
    if (data.email !== user.email) {
      throw new Error("Email must match your registered email");
    }

    verifyAgent(data.agent);
    task.validate(String(data.output));

    return true;
  };

  return { id, title, weight, question, answer };
}
