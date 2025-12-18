import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-endpoint.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-model-name.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-message-content-type.js").then(m => [m.default({ user })])),
    ...(await import("./q-cosine-similarity-concept.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-core-idea.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}