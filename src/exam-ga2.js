import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-zk-stream-rollout.js").then(m => m.default({ user })),
    await import("./q-basic-ci-cache.js").then(m => m.default({ user })),
    await import("./q-advanced-cicd.js").then(m => m.default({ user })),
    await import("./q-hf-docker-secure.js").then(m => m.default({ user })),
    await import("./q-vibe-coding.js").then(m => m.default({ user })),
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
