import { displayQuestions } from "../utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-cli-hidden-files.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-git-current-branch.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-shell-count-lines.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-docker-running-containers.js")
      .then(m => [m.default({ user })])),

    ...(await import("./q-sql-select-all.js")
      .then(m => [m.default({ user })]))
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
