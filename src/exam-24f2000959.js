import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-CLI-Website-Crawling.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Actions-Scheduling.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-API-Search.js").then(m => [m.default({ user })])),
    ...(await import("./q-Google-Sheets-Web-Import.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTML-to-Markdown-Conversion.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}