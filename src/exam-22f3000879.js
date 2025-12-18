import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  // 1. Load all modules in parallel and wait for them to resolve
  const results = await Promise.all([
    import("./q-fastapi-auth.js").then((m) => m.default({ user })),
    import("./q-streamlit-dashboard.js").then((m) => m.default({ user })),
    import("./q-script-metadata.js").then((m) => m.default({ user })),
    import("./q-duckdb-generator.js").then((m) => m.default({ user })), 
    import("./q-github-actions-lint.js").then((m) => m.default({ user })),
  ]);

  // 2. Display them on the page
  displayQuestions(results, elementMap);

  // 3. Return the map of questions for the grading engine
  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}