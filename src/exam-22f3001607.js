import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-llm-json-transform.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-find-outlier.js").then((m) => [m.default({ user })])),
    ...(await import("./q-vision-shipping.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-rag-api.js").then((m) => [m.default({ user })])),
    ...(await import("./q-function-routing.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
