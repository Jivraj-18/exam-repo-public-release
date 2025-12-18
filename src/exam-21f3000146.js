import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-embedding-similarity.js").then(async m => [await m.default({ user })])),
    ...(await import("./q-function-calling.js").then(async m => [await m.default({ user })])),
    ...(await import("./q-rag-definition.js").then(async m => [await m.default({ user })])),
    ...(await import("./q-token-cost.js").then(async m => [await m.default({ user })])),
    ...(await import("./q-vision-base64.js").then(async m => [await m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}