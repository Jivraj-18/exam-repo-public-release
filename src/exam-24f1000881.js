import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-github-api.js").then(m => [
      m.default({ user, weight: 1 })
    ])),

    ...(await import("./q-fastapi-cli.js").then(m => [
      m.default({ user, weight: 1 })
    ])),

    ...(await import("./q-llm-pipeline.js").then(m => [
      m.default({ user, weight: 1 })
    ])),

    ...(await import("./q-llms-txt.js").then(m => [
      m.default({ user, weight: 1 })
    ])),

    ...(await import("./q-ci-testing.js").then(m => [
      m.default({ user, weight: 1 })
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
