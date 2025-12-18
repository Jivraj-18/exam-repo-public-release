import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-local-backup-s3.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-rate-limiting.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-multi-stage-build.js").then(m => [m.default({ user })])),
    ...(await import("./q-codespace-debug-proxy.js").then(m => [m.default({ user })])),
    ...(await import("./q-ollama-load-testing.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
