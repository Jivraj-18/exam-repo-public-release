import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-docker-list-running-containers.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-view-commit-history.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-disk-usage-of-current-directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-create-virtual-environment.js").then(m => [m.default({ user })])),
    ...(await import("./q-sql-count-rows-in-table.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}