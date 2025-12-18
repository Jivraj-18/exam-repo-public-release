import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-data-uri-base64-json.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-gha-crypto-rate-sx-daily.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-gs-importdata-wikipedia-csv.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-hf-space-fastapi-routes.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
    {
      ...(await import("./q-jmespath-queries.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
