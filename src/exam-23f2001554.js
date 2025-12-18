import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-github-user-api.js").then(m => [m.default({ user })])),
    ...(await import("./q-count-files.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-to-markdown.js").then(m => [m.default({ user })])),
    ...(await import("./q-google-sheets.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}