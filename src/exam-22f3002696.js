import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-gitHub-actions-&-cron-scheduling.js").then(m => [m.default({ user })])),
    ...(await import("./q-google-sheets-import-html.js").then(m => [m.default({ user })])),
    ...(await import("./q-nominatim-api-parameters.js").then(m => [m.default({ user })])),
    ...(await import("./q-pdf-to-markdown-conversion.js").then(m => [m.default({ user })])),
    ...(await import("./q-playwright-selectors.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}