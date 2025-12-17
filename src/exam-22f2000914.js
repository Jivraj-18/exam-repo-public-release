// File: src/questions.js
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-deploy-arch-md.js").then((m) => [m.default({ user })])),
    ...(await import("./q-colab-secrets-drive.js").then((m) => [m.default({ user })])),
    ...(await import("./q-vercel-post-endpoint.js").then((m) => [m.default({ user })])),
    ...(await import("./q-gh-actions-cache.js").then((m) => [m.default({ user })])),
    ...(await import("./q-ollama-ngrok.js").then((m) => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
