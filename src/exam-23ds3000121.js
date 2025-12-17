import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-REST-API-Data-Extraction.js").then(m => [
      m.default({ user })
    ])),
    ...(await import("./q-CSS-Selector-Web-Scraping.js").then(m => [
      m.default({ user })
    ])),
    ...(await import("./q-API-Pagination-Data-Collection.js").then(m => [
      m.default({ user })
    ])),
    ...(await import("./q-PDF-Table-Data-Extraction.js").then(m => [
      m.default({ user })
    ])),
    ...(await import("./q-Website-Crawling-and-Analysis.js").then(m => [
      m.default({ user })
    ])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}