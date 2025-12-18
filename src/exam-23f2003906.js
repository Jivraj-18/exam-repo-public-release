import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    await import("./q-bias-prompt.js").then((m) =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-marimo-notebook.js").then((m) =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-cli-workflow.js").then((m) =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-llm-quality.js").then((m) =>
      m.default({ user, weight: 1 })
    ),
    await import("./q-model-selection.js").then((m) =>
      m.default({ user, weight: 1 })
    ),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
