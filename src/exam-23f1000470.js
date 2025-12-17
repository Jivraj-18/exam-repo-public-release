import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-event-loop.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-float-equality.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-regex-lookaround.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-sql-null.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-utf8-bytes.js").then((m) => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}