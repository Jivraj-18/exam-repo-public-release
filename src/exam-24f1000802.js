import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-ESPN Cricinfo IMPORTHTML.js").then(m => [m.default({ user })])),
    ...(await import("./q-IMDb Title Extractor.js").then(m => [m.default({ user })])),
    ...(await import("./q-Excel Web Query.js").then(m => [m.default({ user })])),
    ...(await import("./q-Table Index 2.js").then(m => [m.default({ user })])),
    ...(await import("./q-Sum Ducks Column.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}