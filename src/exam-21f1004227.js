import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-gsheet.js").then(m => [m.default({ user })])),
    ...(await import("./q-BBC-Weather.js").then(m => [m.default({ user })])),
    ...(await import("./q-IMDb Scraping.js").then(m => [m.default({ user })])),
    ...(await import("./q-webscrapping.js").then(m => [m.default({ user })])),
    ...(await import("./q-Paginated-Web-Data.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}