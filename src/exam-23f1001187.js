import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Table-Extraction.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright--purpose.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-API.js").then(m => [m.default({ user })])),
    ...(await import("./q-google-sheetsHTML.js").then(m => [m.default({ user })])),
    ...(await import("./q-Wget Crawling (CLI).js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}