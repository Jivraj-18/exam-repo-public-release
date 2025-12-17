import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-deduplicate-users-by-email.js").then(m => [m.default({ user })])),
    ...(await import("./q-filter-logs-and-extract-ips.js").then(m => [m.default({ user })])),
    ...(await import("./q-group-orders-by-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-normalise-and-rank.js").then(m => [m.default({ user })])),
    ...(await import("./q-time-series-aggregation.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}