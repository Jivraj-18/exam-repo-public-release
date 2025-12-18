import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-wget-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-API-data-sourcing.js").then(m => [m.default({ user })])),
    ...(await import("./q-Google-Sheets-scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-PDF-text-extraction.js").then(m => [m.default({ user })])),
    ...(await import("./q-Playwright-concept.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}