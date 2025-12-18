import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Superkey-counting.js").then(m => [m.default({ user })])),
    ...(await import("./q-Candidate-keys-identification.js").then(m => [m.default({ user })])),
    ...(await import("./q-Functional-dependency-reasoning.js").then(m => [m.default({ user })])),
    ...(await import("./q-Normal-form-concept.js").then(m => [m.default({ user })])),
    ...(await import("./q-Superkey-count.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}