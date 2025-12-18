import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-csv-inspection.js").then(m => [m.default({ user })])),
    ...(await import("./q-data-pipelines.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-virtual-environments.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-via-cli.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}