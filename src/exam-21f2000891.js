import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    { ...(await import("./q-tds-http-headers.js").then((m) => m.default({ user }))) },
    { ...(await import("./q-tds-linux-pipes.js").then((m) => m.default({ user }))) },
    { ...(await import("./q-tds-json-normalization.js").then((m) => m.default({ user }))) },
    { ...(await import("./q-tds-api-pagination.js").then((m) => m.default({ user }))) },
    { ...(await import("./q-tds-python-data-cleaning.js").then((m) => m.default({ user }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}

