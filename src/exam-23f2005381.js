import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-fastapi-blocking-sleep.js").then((m) => m.default({ user, weight: 2 }))),
    ...(await import("./q-docker-arg-vs-env.js").then((m) => m.default({ user, weight: 2 }))),
    ...(await import("./q-regex-greedy-parsing.js").then((m) => m.default({ user, weight: 1.5 }))),
    ...(await import("./q-jq-slice-indices.js").then((m) => m.default({ user, weight: 1.5 }))),
    ...(await import("./q-git-detached-rescue.js").then((m) => m.default({ user, weight: 1.5 }))),
    ...(await import("./q-curl-json-post.js").then((m) => m.default({ user, weight: 1 }))),
    ...(await import("./q-jq-extract-email.js").then((m) => m.default({ user, weight: 1 }))),
    ...(await import("./q-git-merge-conflict.js").then((m) => m.default({ user, weight: 1 }))),
    ...(await import("./q-uv-ephemeral-run.js").then((m) => m.default({ user, weight: 1 }))),
    ...(await import("./q-fastapi-pydantic-typo.js").then((m) => m.default({ user, weight: 1 }))),
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
