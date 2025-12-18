import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-json.js").then(m => [m.default({ user })])),
    ...(await import("./q-pages.js").then(m => [m.default({ user })])),
    ...(await import("./q-prompt.js").then(m => [m.default({ user })])),
    ...(await import("./q-webscrape.js").then(m => [m.default({ user })])),
    ...(await import("./q-dataprep.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}