import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-wget-Recursive-Crawl-Command.js").then(m => [m.default({ user })])),
    ...(await import("./q-Github-User-Search-API-URL.js").then(m => [m.default({ user })])),
    ...(await import("./q-Hacker-News-RSS-Query-URL.js").then(m => [m.default({ user })])),
    ...(await import("./q-Playwright-Browser-Installation-Command.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTML-MARKDOWN-TOOL.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Actions-Cron.js").then(m => [m.default({ user })])),
    ...(await import("./q-PDF-Table-Extraction-Library.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}