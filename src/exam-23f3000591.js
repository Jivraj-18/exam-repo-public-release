import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-docker-run-port-mapping.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-run-uvicorn.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-kill-process.js").then(m => [m.default({ user })])),
    ...(await import("./q-cors-allow-origin-header.js").then(m => [m.default({ user })])),
    ...(await import("./q-linux-export-env-var.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
