import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-embedding-cosine.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-sentiment-role.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-token-overhead.js").then(m => [m.default({ user })])),
    ...(await import("./q-llm-vision-detail.js").then(m => [m.default({ user })])),
    ...(await import("./q-rag-hallucination.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
