import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Present Working Directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-Create directory.js").then(m => [m.default({ user })])),
    ...(await import("./q-Remove a File.js").then(m => [m.default({ user })])),
    ...(await import("./q-View File Contents.js").then(m => [m.default({ user })])),
    ...(await import("./q-Copy  File.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}