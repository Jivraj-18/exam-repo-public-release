import { displayQuestions } from "./utils/display.js";

export default async function questions(user, elementMap) {
  const results = [
    await import("./q-service-outliers.js").then((m) => m.default({ user })),
    await import("./q-retail-cohort.js").then((m) => m.default({ user })),
    await import("./q-sql-margin.js").then((m) => m.default({ user })),
    await import("./q-buffer-planning.js").then((m) => m.default({ user })),
    await import("./q-network-bottleneck.js").then((m) => m.default({ user })),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}