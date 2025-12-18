import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-cost-driver.js").then(m => [m.default({ user })])),
    ...(await import("./q-embedding-similarity.js").then(m => [m.default({ user })])),
    ...(await import("./q-cli-sort-size.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-undo-commit.js").then(m => [m.default({ user })])),
    ...(await import("./q-json-datatype.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}