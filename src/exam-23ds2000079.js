import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-computed-summary-endpoint.js").then(
        (m) => m.default({ user, weight: 1.0 })
      )),
    },
    {
      ...(await import("./q-secrets-deterministic-workflow-output.js").then(
        (m) => m.default({ user, weight: 1.0 })
      )),
    },
    {
      ...(await import("./q-github-actions-error-logging.js").then(
        (m) => m.default({ user, weight: 1.0 })
      )),
    },
	{
	  ...(await import("./q-duckdb-multiformat-diagnostics.js").then(
		(m) => m.default({ user, weight: 1.0 })
	  )),
	},
	{
	  ...(await import("./q-sql-concentration-distribution.js").then(
		(m) => m.default({ user, weight: 1.25 })
	  )),
	},
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
