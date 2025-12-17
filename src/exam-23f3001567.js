import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Web-Scraping-Basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-Google-Sheets.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-API-Search.js").then(m => [m.default({ user })])),
    ...(await import("./q-Hacker-News-RSS.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTML-to-Markdown.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}