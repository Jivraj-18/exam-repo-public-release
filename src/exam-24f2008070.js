import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Claude - Gemini - Copilot (Artifact Reality Check).js").then(m => [m.default({ user })])),
    ...(await import("./q-CLI + Agents.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub API (Temporal Trap).js").then(m => [m.default({ user })])),
    ...(await import("./q-GPT-5 Nano + JSON.js").then(m => [m.default({ user })])),
    ...(await import("./q-llms.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}