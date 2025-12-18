import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-costawarellmusage.js").then(m => [m.default({ user })])),
    ...(await import("./q-multimodalcostoptimization.js").then(m => [m.default({ user })])),
    ...(await import("./q-structuredoutput.js").then(m => [m.default({ user })])),
    ...(await import("./q-tokencostawareness.js").then(m => [m.default({ user })])),
    ...(await import("./q-messageformattingforsentiment.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
