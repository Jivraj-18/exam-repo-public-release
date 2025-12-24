import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-api-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-concept.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-models.js").then(m => [m.default({ user })])),
    ...(await import("./q-function-calling.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-vector-search.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}