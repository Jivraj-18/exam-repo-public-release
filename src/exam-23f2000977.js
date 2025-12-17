import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // 1. Geospatial
    { ...(await import("./q-folium-map.js").then(m => m.default({ user, weight: 1.5 }))) },
    // 2. Excel Outlier
    { ...(await import("./q-excel-outlier-detection.js").then(m => m.default({ user, weight: 0.75 }))) },
    // 3. XML Sitemap
    { ...(await import("./q-sitemap-xml.js").then(m => m.default({ user, weight: 0.5 }))) },
    // 4. DuckDB Cleaning
    { ...(await import("./q-duckdb-survey-cleaning.js").then(m => m.default({ user, weight: 1 }))) },
    // 5. SQL Analysis (NEW)
    { ...(await import("./q-sql-top-customer.js").then(m => m.default({ user, weight: 1 }))) },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}