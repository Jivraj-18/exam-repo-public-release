import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-ga5-api-json-sum.js").then((m) =>
        m.default({ user, weight: 0.5 }),
      )),
    },
    {
      ...(await import("./q-ga5-html-table-sum.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-ga5-hn-rss.js").then((m) =>
        m.default({ user, weight: 0.5 }),
      )),
    },
    {
      ...(await import("./q-ga5-bounding-box.js").then((m) =>
        m.default({ user, weight: 0.5 }),
      )),
    },
    {
      ...(await import("./q-ga5-crawl-count.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
    {
      ...(await import("./q-ga5-html-to-md.js").then((m) =>
        m.default({ user, weight: 1 }),
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return answers for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest]),
  );
}
