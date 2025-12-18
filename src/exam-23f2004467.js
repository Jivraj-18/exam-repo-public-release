import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-AI-Agent-Determinism-vs-Convenience.js").then(m => [m.default({ user })])),
    ...(await import("./q-CLI-Agents.js").then(m => [m.default({ user })])),
    ...(await import("./q-Prompt-Injection-Awareness.js").then(m => [m.default({ user })])),
    ...(await import("./q-UNIX-Philosophy.js").then(m => [m.default({ user })])),
    ...(await import("./q-FastAPI-AI-Agent-Failure-Modes.js").then(m => [m.default({ user })])),
    ...(await import("./q-Vibe-Coding-Reality-Check.js").then(m => [m.default({ user })])),
    ...(await import("./q-Context-Engineering-Precision.js").then(m => [m.default({ user })])),
    ...(await import("./q-Hidden-Evaluation-Strategy.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}