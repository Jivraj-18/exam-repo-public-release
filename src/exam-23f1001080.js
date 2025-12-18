import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-ai-agent-memory.js").then(m => [m.default({ user })])),
    ...(await import("./q-bash-logic-inversion.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-stage-naming.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-path-params.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-strict-mode.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}

