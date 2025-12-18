import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q1-rank-volatility.js").then(m => [m.default({ user })])),
    ...(await import("./q2-survivorship-adjustment.js").then(m => [m.default({ user })])),
    ...(await import("./q3-leakage-detection.js").then(m => [m.default({ user })])),
    ...(await import("./q4-js-distribution-drift.js").then(m => [m.default({ user })])),
    ...(await import("./q5-windowed-rank-reversal.js").then(m => [m.default({ user })])),
    ...(await import("./q6-counterfactual-margin.js").then(m => [m.default({ user })])),
    ...(await import("./q7-simpsons-paradox-facets.js").then(m => [m.default({ user })])),
    ...(await import("./q8-llm-narrative-consistency.js").then(m => [m.default({ user })])),
    ...(await import("./q9-isochrone-inequality.js").then(m => [m.default({ user })])),
    ...(await import("./q10-network-flow-imbalance.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
