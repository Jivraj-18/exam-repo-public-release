import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-docker-fastapi.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-web-scraping.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-geospatial-analysis.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-rag-system.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
    {
      ...(await import("./q-streamlit-dashboard.js").then((m) =>
        m.default({ user, weight: 1 })
      )),
    },
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}