import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-multicollinearity-diagnostics.js").then(m => [m.default({ user })])),
    ...(await import("./q-cost-weighted-margin-dominance.js").then(m => [m.default({ user })])),
    ...(await import("./q-critical-bridge-failure-simulation.js").then(m => [m.default({ user })])),
    ...(await import("./q-funnel-drop-off-elasticity.js").then(m => [m.default({ user })])),
    ...(await import("./q-rolling-volatility-regime-detection.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}