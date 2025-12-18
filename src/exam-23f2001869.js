import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-disabled-input-with-correct-value.js").then(m => [m.default({ user })])),
    ...(await import("./q-DOM-attribute-with-encoded-value.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-actions-schedule-syntax.js").then(m => [m.default({ user })])),
    ...(await import("./q-html-table-and-numeric-computation.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-browser-launch.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}