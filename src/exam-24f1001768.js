import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-fastapi-rate-limit.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-spreadsheet-drift.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-json-unit-inference.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-agent-trace-forensics.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-context-injection-defense.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
