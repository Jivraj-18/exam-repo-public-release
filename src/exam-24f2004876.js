import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-codespaces-port.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-docker-compose.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-docker-image-tag.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-github-actions-badge.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
    {
      ...(await import("./q-hf-fastapi.js").then((m) =>
        m.default({
          user,
          weight: 1,
        })
      )),
    },
  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return data for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
