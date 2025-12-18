import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Docker-Basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-Environment-Variables.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Actions.js").then(m => [m.default({ user })])),
    ...(await import("./q-FastAPI-Deployment.js").then(m => [m.default({ user })])),
    ...(await import("./q-GitHub-Pages-URL-Pattern.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}