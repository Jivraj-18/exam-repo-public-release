import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-api-error-attribution.js")).default({ user, weight: 1 }) },
    { ...(await import("./q-vendor-alias-resolution.js")).default({ user, weight: 1 }) },
    { ...(await import("./q-duckdb-rolling-normalization.js")).default({ user, weight: 1 }) },
    { ...(await import("./q-cohort-decay-comparison.js")).default({ user, weight: 1 }) },
    { ...(await import("./q-critical-hub-identification.js")).default({ user, weight: 1 }) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
