import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-git-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-process-inspection.js").then(m => [m.default({ user })])),
    ...(await import("./q-file-permissions.js").then(m => [m.default({ user })])),
    ...(await import("./q-searching-logs.js").then(m => [m.default({ user })])),
    ...(await import("./q-disk-usage.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}