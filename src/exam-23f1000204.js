import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-OpenAI-Chat-Completion.js").then(m => [m.default({ user })])),
    ...(await import("./q-Embeddings-Model-Identification.js").then(m => [m.default({ user })])),
    ...(await import("./q-Token Cost Awareness.js").then(m => [m.default({ user })])),
    ...(await import("./q-Vision-API-Input-Type.js").then(m => [m.default({ user })])),
    ...(await import("./q-Function-Calling-Output-Format.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}