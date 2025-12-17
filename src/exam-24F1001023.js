import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1
    {
      ...(await import("./q-24F1001023-1.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    // Question 2
    {
      ...(await import("./q-24F1001023-2.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    // Question 3
    {
      ...(await import("./q-24F1001023-3.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    // Question 4
    {
      ...(await import("./q-24F1001023-4.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    // Question 5
    {
      ...(await import("./q-24F1001023-5.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}