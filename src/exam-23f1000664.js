import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-importhtml-syntax.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-useragent.js").then(m => [m.default({ user })])),
    ...(await import("./q-wget-recursive.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-cron.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-readhtml.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}