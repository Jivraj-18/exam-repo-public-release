import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-openai-model.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-endpoint.js").then(m => [m.default({ user })])),
    ...(await import("./q-cosine-similarity.js").then(m => [m.default({ user })])),
    ...(await import("./q-base64-use.js").then(m => [m.default({ user })])),
    ...(await import("./q-vector-db.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}