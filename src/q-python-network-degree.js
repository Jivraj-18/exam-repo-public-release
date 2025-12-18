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

const expectNodeId = (output) => {
  if (!String(output).match(/[A-Za-z0-9]+/)) {
    throw new Error("Output must be a node identifier");
  }
};

const taskFactories = [
  () => ({
    id: "network-degree",
    description:
      "Write and run a Python program using NetworkX that loads an undirected edge list and prints the node with the highest degree centrality. Break ties alphabetically.",
    validate: expectNodeId,
    summary: "the node with highest degree centrality",
  }),
];

const buildTaskUrl = (url, q) => {
  const u = new URL(url);
  u.searchParams.set("q", q);
  return u.toString();
};

export default async function ({ user, weight = 1 }) {
  const id = "q-python-network-degree";
  const title = "Agent Delegation: Network Influence";
  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Network Analysis via CLI Agent</h4>
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
