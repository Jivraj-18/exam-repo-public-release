import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-rust-log-analytics.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-cloudflare-fx-cache.js").then((m) => m.default({ user, weight: 0.75 }))) },
    { ...(await import("./q-poi-cluster-duckdb.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-playwright-timetable-capture.js").then((m) => m.default({ user, weight: 0.75 }))) },
    { ...(await import("./q-ffmpeg-whisper-transcripts.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-lance-vector-search.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-excel-powerquery-etl.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-seaborn-isolation-forest.js").then((m) => m.default({ user, weight: 0.75 }))) },
    { ...(await import("./q-go-notion-metrics.js").then((m) => m.default({ user, weight: 1.0 }))) },
    { ...(await import("./q-fastapi-image-captioning.js").then((m) => m.default({ user, weight: 0.75 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
