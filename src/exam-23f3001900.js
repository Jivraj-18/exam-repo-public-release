import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-excel-correlation-interpretation.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-excel-forecasting-function.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-LLM-Assisted-storytelling.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-seaborn-visualization.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-sql-window-function-logic.js").then((m) => [
      m.default({ user }),
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
