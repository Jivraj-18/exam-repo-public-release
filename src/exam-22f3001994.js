import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-my-question-1.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-my-question-2.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-my-question-3.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-my-question-4.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-my-question-5.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
