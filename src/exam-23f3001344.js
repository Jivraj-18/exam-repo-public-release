import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-token-cost.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-sentiment.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-similarity.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-vision.js").then(m => [m.default({ user })])),
    ...(await import("./q-vector-db.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
