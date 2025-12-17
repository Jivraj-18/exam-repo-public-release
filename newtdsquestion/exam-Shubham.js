import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [

    {
      ...(await import("./q-auth-oidc.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    {
      ...(await import("./q-llm-guardrails.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    {
      ...(await import("./q-git-workflow.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    {
      ...(await import("./q-data-idempotency.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

    {
      ...(await import("./q-rate-limiting.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
    },

  ];

  // Render questions
  displayQuestions(results, elementMap);

  // Return for scoring
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
