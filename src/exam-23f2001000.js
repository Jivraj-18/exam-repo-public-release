import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-weather-openmeteo.js").then(m => [m.default({ user })])),
    ...(await import("./q-wikipedia-infobox.js").then(m => [m.default({ user })])),
    ...(await import("./q-github-repo-search.js").then(m => [m.default({ user })])),
    ...(await import("./q-html-count-links.js").then(m => [m.default({ user })])),
    ...(await import("./q-scheduled-action-time.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}