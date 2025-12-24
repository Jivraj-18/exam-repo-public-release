import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-gemini-canvas-study-planner.js").then(m => [m.default({ user })])),
    ...(await import("./q-claude-artifact-log-analyzer.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-cli-agent.js").then(m => [m.default({ user })])),
    ...(await import("./q-copilot-fitness-planner.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-followers-date.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}