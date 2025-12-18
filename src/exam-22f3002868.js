import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Markdown Slide Support.js").then(m => [m.default({ user })])),
    ...(await import("./q-YAML Front Matter.js").then(m => [m.default({ user })])),
    ...(await import("./q-Reactive Execution.js").then(m => [m.default({ user })])),
    ...(await import("./q-Correlation Analysis Tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-Boxplot Function.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}