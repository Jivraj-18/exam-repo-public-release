import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-db-index.js").then(m => [m.default({ user })])),
    ...(await import("./q-prompt-pattern.js").then(m => [m.default({ user })])),
    ...(await import("./q-rate-limit.js").then(m => [m.default({ user })])),
    ...(await import("./q-streaming-protocol.js").then(m => [m.default({ user })])),
    ...(await import("./q-vector-db.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}