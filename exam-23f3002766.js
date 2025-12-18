import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-docker-container-run.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-branch-merge.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-groupby-sum.js").then(m => [m.default({ user })])),
    ...(await import("./q-regex-phone-validation.js").then(m => [m.default({ user })])),
    ...(await import("./q-jq-json-filter.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
