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
const numbersIn = (text) =>
  Array.from(String(text).matchAll(/-?\d+/g)).map((m) => m[0]);

const expectAnyNumber = (output) => {
  if (numbersIn(output).length === 0) {
    throw new Error("Output must contain a numeric count");
  }
};

// ---------------- Task factory ----------------
const taskFactories = [
  () => ({
    id: "crawl-html-count",
    description:
      "Write and run a program that crawls https://sanand0.github.io/tdsdata/crawl_html/ and prints how many HTML files have filenames starting with letters J through V (inclusive). Print only the number.",
    validate: expectAnyNumber,
    summary: "the count of HTML files between J and V",
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
  const id = "q-crawl-html-count";
  const title = "Agent Delegation: Website Crawling Analysis";

  const random = seedrandom(`${user.email}#${id}`);
  const task = pick(taskFactories, random)(random);

  const question = html`
    <div class="mb-3">
      <h4>Delegating Web Crawling to a CLI Agent</h4>

      <p>
        You must expose a public <code>GET /task?q=...</code> endpoint that
        forwards the task to a CLI coding agent capable of crawling websites.
      </p>

      <p><strong>Task:</strong></p>
      <code class="d-block my-2">${task.description}</code>

      <label class="form-label">
        Enter the full URL of your <code>/task</code> endpoint
      </label>
      <input class="form-control" id="${id}" type="url" />

      <p class="text-muted">
        We will verify your agent name, email, and that the output matches
        ${task.summary}.
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
