import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-rest-api-pagination.js").then((m) =>
      [m.default({ user })]
    )),

    ...(await import("./q-js-rendered-table.js").then((m) =>
      [m.default({ user })]
    )),

    ...(await import("./q-wikipedia-outline.js").then((m) =>
      [m.default({ user })]
    )),

    ...(await import("./q-github-search.js").then((m) =>
      [m.default({ user })]
    )),

    ...(await import("./q-pdf-table.js").then((m) =>
      [m.default({ user })]
    )),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
