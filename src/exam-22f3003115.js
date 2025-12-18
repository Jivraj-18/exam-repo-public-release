import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-json-sensor-rollup.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-seaborn-data-visualization.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    // later you can add more q-*.js here
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
