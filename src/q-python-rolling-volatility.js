import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";
import { pick } from "./utils/random.js";

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
  const v = String(agent || "").toLowerCase();
  if (!v.trim()) throw new Error("Agent required");
  if (!allowedAgents.some((a) => v.includes(a))) {
    throw new Error("Unknown CLI agent");
  }
};

const expectDecimal2 = (output) => {
  if (!String(output).match(/\d+\.\d{2}/)) {
    throw new Error("Output must be a decimal rounded to 2 places");
  }
};

const taskFactories = [
  () => ({
    id: "rolling-volatility",
    description:
      "Write and run a Python program that loads a CSV of daily revenue, filters region = APAC, computes the 7-day rolling standard deviation excluding the current day, and prints the maximum value rounded to two decimals.",
    validate: expectDecimal2,
    summary: "the maximum rolling volatility",
  }),
];

const buildTaskUrl = (url, q) => {
  const u = new URL(url);
  u.searchParams.set("q", q);
  return u.toString();
};

export default async function ({ user, weight = 1 }) {
  const id = "q-python-rolling-volatility";
  const title = "Agent Delegation: Rolling Volatility Analysis";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Python Analytics via CLI Agent</h4>
      <p>
        Delegate time-series analysis to a CLI coding agent.
      </p>

      <code class="d-block my-2">${task.description}</code>

      <label class="form-label">Enter your <code>/task</code> endpoint URL</label>
      <input class="form-control" id="${id}" type="url" />
    </div>
  `;

  const answer = async (url) => {
    const resp = await fetch(buildTaskUrl(url, task.description));
    const data = await resp.json();

    if (data.email !== user.email) throw new Error("Email mismatch");
    verifyAgent(data.agent);
    task.validate(String(data.output));

    return true;
  };

  return { id, title, weight, question, answer };
}
