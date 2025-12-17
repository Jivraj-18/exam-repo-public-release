import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-shell-api-latency.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-duckdb-revenue-quality.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-llm-cli-bash-pipeline.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-vercel-env-guardrails.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-github-actions-release-tag.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
