import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-dockerbasics.js").then(m => [m.default({ user })])),
    ...(await import("./q-githubactionstrigger.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-deployment.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-pages-hoisting.js").then(m => [m.default({ user })])),
    ...(await import("./q-ngrok-usage.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}