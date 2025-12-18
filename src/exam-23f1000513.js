import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {

  const results = [

    ...(await import("./q-llm-intent-classification.js")).then((m) =>
      m.default({ user, weight: 1 })
    ),

    ...(await import("./q-token-count-estimation.js")).then((m) =>
      m.default({ user, weight: 1 })
    ),

    ...(await import("./q-embedding-cosine.js")).then((m) =>
      m.default({ user, weight: 1 })
    ),

    ...(await import("./q-rag-endpoint-design.js")).then((m) =>
      m.default({ user, weight: 1 })
    ),

    ...(await import("./q-function-routing.js")).then((m) =>
      m.default({ user, weight: 1 })
    ),

  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
