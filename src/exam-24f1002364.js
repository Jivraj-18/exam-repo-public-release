import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-google.js").then(m => [m.default({ user })])),
    ...(await import("./q-html.js").then(m => [m.default({ user })])),
    ...(await import("./q-override.js").then(m => [m.default({ user })])),
    ...(await import("./q-css.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}