import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-crawl-html-range.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-newest-user-advanced.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-conditional-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-dynamic-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-wikipedia-outline-depth.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}