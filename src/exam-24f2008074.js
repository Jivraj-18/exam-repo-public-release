import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-embedding-similarity-calculation.js").then(m => [m.default({ user })])),
    ...(await import("./q-openai-structured-outputs.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-cli-tools.js").then(m => [m.default({ user })])),
    ...(await import("./q-prompt-foo-configuration.js").then(m => [m.default({ user })])),
    ...(await import("./q-vision-api-parameters.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}