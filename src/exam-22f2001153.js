import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-marp-export.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-seaborn-savefig.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-gh-pages-command.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-docker-push.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-fastapi-cors.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-llm-token-tool.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),

    ...(await import("./q-llm-embedding-model.js").then((m) => [
      m.default({ user, weight: 1 }),
    ])),
  ];

  // Render questions on UI
  displayQuestions(results, elementMap);

  // Return answers + weights for evaluation
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
