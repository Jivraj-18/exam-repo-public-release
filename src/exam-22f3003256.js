import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-weekend-api-audit.js").then(m => [m.default({ user })])),
    ...(await import("./q-canonical-tag-extraction.js").then(m => [m.default({ user })])),
    ...(await import("./q-fiscal-quater.js").then(m => [m.default({ user })])),
    ...(await import("./q-stream-processing.js").then(m => [m.default({ user })])),
    ...(await import("./q-handeling-curropt-row.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}