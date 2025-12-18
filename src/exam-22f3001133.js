import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-api-github-conditional-requests.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-agent-approval-modes.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-deterministic-output.js").then(m => [m.default({ user })])),
    ...(await import("./q-context-persistent-memory.js").then(m => [m.default({ user })])),
    ...(await import("./q-testing-mutation-ai-code.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}