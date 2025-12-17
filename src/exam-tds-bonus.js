import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-api-debugging.js").then(m =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-data-validation.js").then(m =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-env-variables.js").then(m =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-json-error.js").then(m =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-rate-limit.js").then(m =>
      m.default({ user, weight: 1 })
    ),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
