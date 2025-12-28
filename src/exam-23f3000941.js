import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-file-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-check-repository-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-basic-get-endpoint.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-build-image.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-manual-trigger.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}