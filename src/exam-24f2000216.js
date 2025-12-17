import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // 1. Linux scheduler
    ...(await import("./q-linux-scheduler.js").then((m) => [m.default({ user })])),
    
    // 2. NEW: AI Jailbreak API (replaces vector DB overkill)
    ...(await import("./q-prompt-jailbreak-api.js").then((m) => [m.default({ user })])),
    
    // 3. Vector DB vs DuckDB
    ...(await import("./q-vector-db-vs-duckdb.js").then((m) => [m.default({ user })])),
    
    // 4. Python correlation significance
    ...(await import("./q-python-correlation-significance.js").then((m) => [m.default({ user })])),
    
    // 5. Data visualization story-first
    ...(await import("./q-visualization-revenue-retention.js").then((m) => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
