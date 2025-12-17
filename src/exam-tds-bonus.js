import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-uv-httpbin-headers.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-llm-streaming-sse.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-marimo-reactive-dependency.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
      {
      ...(await import("./q-sql-rolling-conversion-lift.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-duckdb-json-error-rate.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    }
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
