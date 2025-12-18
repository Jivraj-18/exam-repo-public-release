import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-interactive-rebase.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-virtual-environment-creation.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-container-listing.js").then(m => [m.default({ user })])),
    ...(await import("./q-matplotlib-scatter-plot.js").then(m => [m.default({ user })])),
    ...(await import("./q-pandas-missing-value-handling.js").then(m => [m.default({ user })])),
    ...(await import("./q-jupyter-notebook-magic-command.js").then(m => [m.default({ user })])),
    ...(await import("./q-curl-api-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}