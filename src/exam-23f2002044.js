import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [

    ...(await import("./q-git-status.js").then(m => [m.default({ user })])),
    ...(await import("./q-node-run.js").then(m => [m.default({ user })])),
    ...(await import("./q-pwd-command.js").then(m => [m.default({ user })])),
    ...(await import("./q-http-tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-excel-sum.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
