import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-curl-api-fetch.js").then(m => [m.default({ user })])),
    ...(await import("./q-countfilesCLi.js").then(m => [m.default({ user })])),
    ...(await import("./q-extract-table-gsheets.js").then(m => [m.default({ user })])),
    ...(await import("./q-python-req-json-access.js").then(m => [m.default({ user })])),
    ...(await import("./q-Action-schedule.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}