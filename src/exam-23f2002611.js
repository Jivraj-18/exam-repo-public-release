import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-tokens.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-input.js").then(m => [m.default({ user })])),
    ...(await import("./q-function-calling.js").then(m => [m.default({ user })])),
    ...(await import("./q-vector-similarity.js").then(m => [m.default({ user })])),
    ...(await import("./q-image-generation.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}