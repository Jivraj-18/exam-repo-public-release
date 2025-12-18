import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-csv-aggregate.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-json-api-extract.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-github-file-count.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-pdf-calculation.js").then(m => m.default({ user, weight: 1 }))) },
    { ...(await import("./q-llm-prompt-pattern.js").then(m => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
