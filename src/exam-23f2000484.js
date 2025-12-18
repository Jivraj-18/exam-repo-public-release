import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-binary-json.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-token-compare.js").then(m => [m.default({ user })])),
    ...(await import("./q-embeddings-batch.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-json-extract.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-endpoint.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
