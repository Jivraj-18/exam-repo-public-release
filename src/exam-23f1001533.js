import { displayQuestions } from "./utils/display.js";
//import question modules for the exam
export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-LLM-Sentiment-Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-Token-Cost-Awareness.js").then(m => [m.default({ user })])),
    ...(await import("./q-Embeddings-Model-Identification.js").then(m => [m.default({ user })])),
    ...(await import("./q-Vision-API-Input-Format.js").then(m => [m.default({ user })])),
    ...(await import("./q-Function-Calling-Strictness.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}