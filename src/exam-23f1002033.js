import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-log-insights.js").then(m => [m.default({ user })])),
    ...(await import("./q-ai-eval-scorecard-design.js").then(m => [m.default({ user })])),
    ...(await import("./q-vibe-js-array-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-structured-summary.js").then(m => [m.default({ user })])),
    ...(await import("./q-serverless-region-metrics.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}

