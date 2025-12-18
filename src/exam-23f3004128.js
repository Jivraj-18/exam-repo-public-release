import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-python.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux.js").then(m => [m.default({ user })])),
    ...(await import("./q-node.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}