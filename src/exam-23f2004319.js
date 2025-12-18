import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-data_analysis_python_csv.js").then(m => [m.default({ user })])),
    ...(await import("./q-data_prep_excel.js").then(m => [m.default({ user })])),
    ...(await import("./q-duckdb_cohort_engagement.js").then(m => [m.default({ user })])),
    ...(await import("./q-prompt_engineering.js").then(m => [m.default({ user })])),
    ...(await import("./q-scrape_hackernews.js").then(m => [m.default({ user })]))
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}
