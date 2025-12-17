import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-http-status-codes.js").then((m) =>
      m.default({ user })
    ),
    await import("./q-json-validation.js").then((m) =>
      m.default({ user })
    ),
    await import("./q-sql-group-by.js").then((m) =>
      m.default({ user })
    ),
    await import("./q-git-reset-revert.js").then((m) =>
      m.default({ user })
    ),
    await import("./q-docker-port-mapping.js").then((m) =>
      m.default({ user })
    ),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
