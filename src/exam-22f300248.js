
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-revealjs-fragments.js").then(m => [m.default({ user })])),
    ...(await import("./q-marimo-ui.js").then(m => [m.default({ user })])),
    ...(await import("./q-marp-background.js").then(m => [m.default({ user })])),
    ...(await import("./q-seaborn-heatmap.js").then(m => [m.default({ user })])),
    ...(await import("./q-rawgraphs-beeswarm.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}