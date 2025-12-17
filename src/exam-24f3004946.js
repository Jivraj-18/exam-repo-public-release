import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-pipeline.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-route.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions.js").then(m => [m.default({ user })])),
    ...(await import("./q-Vibe-Coding.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-basic.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}