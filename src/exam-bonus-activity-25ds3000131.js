import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-csv-parsing.js").then((m) => m.default({ user })),
    await import("./q-sql-filtering.js").then((m) => m.default({ user })),
    await import("./q-git-status.js").then((m) => m.default({ user })),
    await import("./q-excel-logic.js").then((m) => m.default({ user })),
    await import("./q-python-regex.js").then((m) => m.default({ user })),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}