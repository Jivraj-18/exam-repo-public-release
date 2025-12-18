import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-sentiment-validation.js").then(m => [m.default({ user })])),
    ...(await import("./q-token-count.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-validation.js").then(m => [m.default({ user })])),
    ...(await import("./q-cosine-sim.js").then(m => [m.default({ user })])),
    ...(await import("./q-api-endpoint-recognition.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}