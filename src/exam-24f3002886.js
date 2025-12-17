import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-sentiment-analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-function-calling.js").then(m => [m.default({ user })])),
    ...(await import("./q-structured-output.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-api.js").then(m => [m.default({ user })])),
    ...(await import("./q-token-cost.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
