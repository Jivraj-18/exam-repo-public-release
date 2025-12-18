import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Embeddings.js").then(m => [m.default({ user })])),
    ...(await import("./q-LLM API-Zero-Shot Classification JSON.js").then(m => [m.default({ user })])),
    ...(await import("./q-Prompt Engineering.js").then(m => [m.default({ user })])),
    ...(await import("./q-Structured Outputs with JSON Schema.js").then(m => [m.default({ user })])),
    ...(await import("./q-Tokenization & Cost Awareness.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}