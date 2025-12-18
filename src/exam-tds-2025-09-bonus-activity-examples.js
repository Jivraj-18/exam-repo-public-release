import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Existing syllabus markdown
import json from "./tds/json.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import visualization from "./tds/data-visualization-with-seaborn.md";
import geospatial from "./tds/geospatial-analysis-with-excel.md";
import largeLanguageModels from "./tds/large-language-models.md";

export async function questions(user, elementMap) {
  const results = [
    {
      ...(await import("./q-workers-kv.js").then(m =>
        m.default({ user, weight: 1.25 })
      )),
      help: md(json),
    },

    {
      ...(await import("./q-d3-binding.js").then(m =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(visualization),
    },

    {
      ...(await import("./q-duckdb-query.js").then(m =>
        m.default({ user, weight: 1.25 })
      )),
      help: md(pythonAnalysis),
    },

    {
      ...(await import("./q-langchain-rag.js").then(m =>
        m.default({ user, weight: 1.5 })
      )),
      help: md(largeLanguageModels),
    },

    {
      ...(await import("./q-polars-lazy.js").then(m =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(pythonAnalysis),
    },

    // ✅ NEW – Geospatial
    {
      ...(await import("./q-point-in-polygon.js").then(m =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(geospatial),
    },

    // ✅ NEW – Data Cleaning
    {
      ...(await import("./q-csv-validation.js").then(m =>
        m.default({ user, weight: 1.0 })
      )),
      help: md(json),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}