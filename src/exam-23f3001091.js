import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Embeddings-&-Similarity.js").then(m => [m.default({ user })])),
    ...(await import("./q-LLM-API.js").then(m => [m.default({ user })])),
    ...(await import("./q-Token-Cost-Awareness.js").then(m => [m.default({ user })])),
    ...(await import("./q-Structured-Output.js").then(m => [m.default({ user })])),
    ...(await import("./q-Vision-API.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}