import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-time-complexity-23f2005360.js").then(m =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-bayes-23f2005360.js").then(m =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-sql-logic-23f2005360.js").then(m =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-deadlock-23f2005360.js").then(m =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-logic-23f2005360.js").then(m =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
