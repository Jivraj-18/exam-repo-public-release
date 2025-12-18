import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Change-Directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-count-lines-in-a-file.js").then(m => [m.default({ user })])),
    ...(await import("./q-Present-Working-Directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-redirect-output-to-file.js").then(m => [m.default({ user })])),
    ...(await import("./q-search-text-ignore-case.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}