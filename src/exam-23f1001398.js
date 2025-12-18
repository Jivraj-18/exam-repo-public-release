import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Git Basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python Package Management.js").then(m => [m.default({ user })])),
    ...(await import("./q-Docker Basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-Linux File Permissions.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python Virtual Environments.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}