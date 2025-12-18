import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-fastapi-github-endpoint.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-sum-transform.js").then(m => [m.default({ user })])),
    ...(await import("./q-docker-metadata.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-streaming.js").then(m => [m.default({ user })])),
    ...(await import("./q-fastapi-weather-streak.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}