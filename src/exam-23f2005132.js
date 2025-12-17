import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-shell-counting-lines.js").then(m => [m.default({ user })])),
    ...(await import("./q-reading-messy-csvs.js").then(m => [m.default({ user })])),
    ...(await import("./q-jq-filtering-data.js").then(m => [m.default({ user })])),
    ...(await import("./q-dbt-model-referencing.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-pillow-resizing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}