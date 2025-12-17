import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-dockerfile-fundamentals.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-caching.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-deployment.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-page-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-serverless-deployment.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}