import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-uv-metadata.js").then(m => [m.default({ user })])),
    ...(await import("./q-openai-strict.js").then(m => [m.default({ user })])),
    ...(await import("./q-gha-hash.js").then(m => [m.default({ user })])),
    ...(await import("./q-css-suffix.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-window.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}