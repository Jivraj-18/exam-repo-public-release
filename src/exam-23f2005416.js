import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-json-schema-shipping.js").then((m) =>
        m.default({ weight: 1 })
      )),
    },
    {
      ...(await import("./q-hypothesis-test.js").then((m) =>
        m.default({ weight: 1 })
      )),
    },
    {
      ...(await import("./q-promptfoo-assertion.js").then((m) =>
        m.default({ weight: 1 })
      )),
    },
    {
      ...(await import("./q-llm-pipeline.js").then((m) =>
        m.default({ weight: 1 })
      )),
    },
    {
      ...(await import("./q-fastapi-subprocess.js").then((m) =>
        m.default({ weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  // Return data for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}