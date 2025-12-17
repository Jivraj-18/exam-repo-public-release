import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-rolling-volatility.js").then((m) =>
        m.default({ user })
      )),
      weight: 1,
    },

    {
      ...(await import("./q-network-centrality.js").then((m) =>
        m.default({ user })
      )),
      weight: 1,
    },

    {
      ...(await import("./q-embedding-semantic-drift.js").then((m) =>
        m.default({ user })
      )),
      weight: 1,
    },

    {
      ...(await import("./q-json-revenue-anomaly.js").then((m) =>
        m.default({ user })
      )),
      weight: 1,
    },

    {
      ...(await import("./q-matrix-dominant-direction.js").then((m) =>
        m.default({ user })
      )),
      weight: 1,
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
