import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-docker-basics.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-cors.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-trigger.js").then(m => [m.default({ user })])),
    ...(await import("./q-ngrok-local-to-public-access.js").then(m => [m.default({ user })])),
    ...(await import("./q-vercel-deployment.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}