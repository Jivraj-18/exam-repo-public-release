import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-gitHub-actions-dependency-caching.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-cli-pipeline.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-structured-output.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-similarity-metric.js").then(m => [m.default({ user })])),
    ...(await import("./q-wget-robots-override.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}