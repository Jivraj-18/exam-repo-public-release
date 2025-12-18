import { html } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-filter-api-json.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },

    {
      ...(await import("./q-importhtml-formula.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },

    {
      ...(await import("./q-network-betweenness.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },

    {
      ...(await import("./q-rolling-anomaly.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },

    {
      ...(await import("./q-seaborn-linear-forecast.js").then((m) =>
        m.default({ user, weight: 1.25 }),
      )),
    },

    
    {
      ...(await import("./q-sql-growth-streak.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
