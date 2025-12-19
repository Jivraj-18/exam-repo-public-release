import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    ...(await import("./q-Excel_Correlation_Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python_Cohort_Retention_Calculation.js").then(m => [m.default({ user })])),
    ...(await import("./q-SQL_Window_Functions.js").then(m => [m.default({ user })])),
    ...(await import("./q-DuckDB_Gross_Margin_Analysis.js").then(m => [m.default({ user })])),
    ...(await import("./q-Python_Geospatial_Distance_Filtering.js").then(m => [m.default({ user })])),
  ];

  displayQuestions(results, elementMap);

  return Object.fromEntries(
    results.map(({ id, ...rest }) => [id, rest])
  );
}