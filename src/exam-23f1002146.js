import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Python-HTTP-Requests.js").then(m => [m.default({ user })])),
    ...(await import("./q-CLI-web-crawling.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Actions-Cron-Schedule.js").then(m => [m.default({ user })])),
    ...(await import("./q-google-sheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTML-Markdown-Conversion.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}