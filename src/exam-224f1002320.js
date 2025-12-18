import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-GitHub-API.js").then(m => [m.default({ user })])),
    ...(await import("./q-Google-Sheets.js").then(m => [m.default({ user })])),
    ...(await import("./q-PDF-to-Markdown.js").then(m => [m.default({ user })])),
    ...(await import("./q-Playwright.js").then(m => [m.default({ user })])),
    ...(await import("./q-Wget.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}