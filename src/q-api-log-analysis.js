import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import seedrandom from "seedrandom";

const randInt = (random, min, max) => Math.floor(random() * (max - min + 1)) + min;
const pick = (random, arr) => arr[randInt(random, 0, arr.length - 1)];

const buildResponses = (random) => {
  const base = [
    {
      id: "r1",
      text: '{"status":"ok","content":"vector store updated"}',
    },
    {
      id: "r2",
      text: '```json\n{"status":"ok","content":"done"}\n```',
    },
    {
      id: "r3",
      text: '{"status":"fail","content":"rate limited"}\nExtra note: retried twice',
    },
    {
      id: "r4",
      text: '{"status":"fail","content":42}',
    },
  ];

  const alt = pick(random, [
    { id: "r5", text: '{"status":"ok","content":"cached"}' },
    { id: "r5", text: '{"status":"ok","content":"cached","debug":true}' },
  ]);

  base.splice(randInt(random, 1, 3), 0, alt);
  return base;
};

const findInvalid = (responses) => {
  const invalid = [];
  for (const { id, text } of responses) {
    const trimmed = String(text || "").trim();
    if (trimmed.includes("```")) {
      invalid.push(id);
      continue;
    }
    if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
      invalid.push(id);
      continue;
    }
    let data;
    try {
      data = JSON.parse(trimmed);
    } catch {
      invalid.push(id);
      continue;
    }
    const keys = Object.keys(data);
    const allowedKeys = new Set(["status", "content"]);
    if (keys.length !== 2 || !keys.every((k) => allowedKeys.has(k))) {
      invalid.push(id);
      continue;
    }
    if (!["ok", "fail"].includes(data.status)) {
      invalid.push(id);
      continue;
    }
    if (typeof data.content !== "string") {
      invalid.push(id);
      continue;
    }
  }
  return invalid.sort();
};

export default async function({ user, weight = 1 }) {
  const id = "q-llm-structured-output-audit";
  const title = "LLM Output Contract Audit";
  const random = seedrandom(`${user.email}#${id}`);

  const responses = buildResponses(random);
  const invalid = findInvalid(responses);
  const expected = invalid.length ? invalid.join(",") : "none";

  const question = html`
    <div class="mb-3">
      <h4>LLM Guardrails: Enforce JSON-only output</h4>
      <p>
        A model must reply with JSON <code>{"status":"ok|fail","content":"..."}</code> and nothing else.
        No code fences, no extra keys, no trailing prose.
      </p>
      <p>Which responses violate the contract? Return their IDs in ascending order, comma-separated. If all are valid, enter <code>none</code>.</p>
      <ul>
        ${responses.map((r) => html`<li><strong>${r.id}</strong>: <code>${r.text}</code></li>`)}
      </ul>
      <input class="form-control" id="${id}" name="${id}" placeholder="e.g., r2,r4" />
    </div>
  `;

  const answer = (input) => {
    if (input === undefined || input === null) throw new Error("Answer required");
    const candidate = String(input).trim();
    if (!candidate) throw new Error("Answer required");
    const normalized = candidate.toLowerCase().replace(/\s+/g, "");
    return normalized === expected;
  };

  return { id, title, weight, question, answer };
}