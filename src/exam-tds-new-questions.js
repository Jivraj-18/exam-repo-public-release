import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-serverless-latency.js").then((m) => m.default({ user, weight: 0.5 }))) },
    { ...(await import("./q-api-pagination-backoff.js").then((m) => m.default({ user, weight: 0.5 }))) },
    { ...(await import("./q-binary-sensor-decode.js").then((m) => m.default({ user, weight: 0.5 }))) },
    { ...(await import("./q-dirty-log-cleaning.js").then((m) => m.default({ user, weight: 0.5 }))) },
    { ...(await import("./q-timeseries-anomaly.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-geospatial-raycasting.js").then((m) => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-llm-medical-extraction.js").then((m) => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}