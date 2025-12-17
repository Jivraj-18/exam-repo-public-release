import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-import-html-sheets").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-extract").then(m => [m.default({ user })])),
    ...(await import("./q-wget-crawl").then(m => [m.default({ user })])),
    ...(await import("./q-gh-actions-schedule").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-api").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}