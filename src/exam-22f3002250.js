import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-sheets-xml.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-api-query.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-structure.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-markdown-tool.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-innertext.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}