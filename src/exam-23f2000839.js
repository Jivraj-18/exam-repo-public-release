import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-dataviz-chart-type.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-eval-design.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-eval-robustness.js").then(m => [m.default({ user })])),
    ...(await import("./q-dbt-materialization.js").then(m => [m.default({ user })])),
    ...(await import("./q-openai-embeddings.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
