import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-check-open-ports.js").then(m => [m.default({ user })])),
    ...(await import("./q-export-environment-variable.js").then(m => [m.default({ user })])),
    ...(await import("./q-kill-process.js").then(m => [m.default({ user })])),
    ...(await import("./q-list-running-containers.js").then(m => [m.default({ user })])),
    ...(await import("./q-view-commit-history.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}