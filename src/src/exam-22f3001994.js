import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google-sheets-importhtml.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-user-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-wget-html-crawling.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-tabula-extract.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-auto-wait.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
