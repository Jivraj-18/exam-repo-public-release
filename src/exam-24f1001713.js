import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli.js").then(m => [m.default({ user })])),
    ...(await import("./q-Google-Sheets.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Actions.js").then(m => [m.default({ user })])),
    ...(await import("./q-Web-APIs.js").then(m => [m.default({ user })])),
    ...(await import("./q-Playwright.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}