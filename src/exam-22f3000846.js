import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-vibe-coding-philosophy.js").then(m => [m.default({ user })])),
    ...(await import("./q-windsurf-core-agent.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-cli-logging.js").then(m => [m.default({ user })])),
    ...(await import("./q-claude-context-file.js").then(m => [m.default({ user })])),
    ...(await import("./q-premortem-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}