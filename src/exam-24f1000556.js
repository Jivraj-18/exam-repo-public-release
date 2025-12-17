import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Cli-FileCounting.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-Github-Actions.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-Data-Extraction.js").then((m) => [
      m.default({ user }),
    ])),
    ...(await import("./q-Web-Scraping.js").then((m) => [m.default({ user })])),
    ...(await import("./q-Api-Usage.js").then((m) => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
