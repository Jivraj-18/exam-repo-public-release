import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Q1: Bash - Sort and Count Log Entries
    {
      ...(await import("./q-bash-sort-logs.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Q2: Git - Commit Reachability
    {
      ...(await import("./q-git-commit-reachability.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Q3: REST API - Invalid Field Type
    {
      ...(await import("./q-rest-api-invalid-field-type.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Q4: FastAPI - Pydantic Validation
    {
      ...(await import("./q-fastapi-pydantic-validation.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // Q5: JSON - Safe Property Access
    {
      ...(await import("./q-json-safe-access.js").then((m) => m.default({ user, weight: 1 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
