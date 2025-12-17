import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-python-devcontiner.js").then(m => [m.default({ user })])),
    ...(await import("./q4-marimo-reactive.js").then(m => [m.default({ user })])),
    ...(await import("./q5-orbit-ops-dbt.js").then(m => [m.default({ user })])),
    ...(await import("./q-metrics-api-docker.js").then(m => [m.default({ user })])),
    ...(await import("./q-sequece-streak-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}