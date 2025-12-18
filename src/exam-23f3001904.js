import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-filesizesorting.js").then(m => [m.default({ user })])),
    ...(await import("./q-checkcurrentbranch.js").then(m => [m.default({ user })])),
    ...(await import("./q-runformatter.js").then(m => [m.default({ user })])),
    ...(await import("./q-postrequest.js").then(m => [m.default({ user })])),
    ...(await import("./q-validationtool.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}