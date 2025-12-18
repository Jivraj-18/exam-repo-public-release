import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-text-generation.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-schema-strict.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-model-dimension.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-api-detail.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-chunk-separator.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}

