import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-shell-http-5xx-count.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-json-stream-parser.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-duckdb-ignore-errors.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-cli-sed-substitute.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-cli-find-byname.js")
      .then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
