import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-prompt-engineering.js").then(m => [m.default({ user })])),
    ...(await import("./q-token-limits.js").then(m => [m.default({ user })])),
    ...(await import("./q-embeddings.js").then(m => [m.default({ user })])),
    ...(await import("./q-function-calling.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
