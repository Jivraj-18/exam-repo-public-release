import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-cli-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-cli-fundamentals.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-execution-cli.js").then(m => [m.default({ user })])),
    ...(await import("./q-unix-file-permission.js").then(m => [m.default({ user })])),
    ...(await import("./q-networking-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}