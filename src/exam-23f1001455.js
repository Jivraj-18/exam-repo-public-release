import { displayQuestions } from "./tds/utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    
    {
      ...(await import("./tds/utils/q-weather-aggregation.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./tds/utils/q-python-rolling-volatility.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./tds/utils/q-python-network-degree.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./tds/utils/q-crawl-html-count.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./tds/utils/q-sql-retention-decay.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return grading map
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
