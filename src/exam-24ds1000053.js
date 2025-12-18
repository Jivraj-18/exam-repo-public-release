import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-docker–list-running-containers.js").then(m => [m.default({ user })])),
    ...(await import("./q-git-check-current-branch.js").then(m => [m.default({ user })])),
    ...(await import("./q-HTTP-json-request.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux–running-processes.js").then(m => [m.default({ user })])),
    ...(await import("./q-python–create-virtual-evironment.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}