import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-file-counting.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-action.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTTP-status-inspection.js.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-api-parsing.js.js").then(m => [m.default({ user })])),
    ...(await import("./q-web-scrapping.js.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
