import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Core Tools in Data Science (from all GA modules)
import excel from "./tds/spreadsheets.md";
import json from "./tds/json.md";
import pythonAnalysis from "./tds/data-analysis-with-python.md";
import dataTransformation from "./tds/data-transformation-in-excel.md";
import webScraping from "./tds/scraping-imdb-with-javascript.md";
import geospatial from "./tds/geospatial-analysis-with-excel.md";
import imageCompression from "./tds/image-compression.md";
import largeLanguageModels from "./tds/large-language-models.md";
import visualization from "./tds/data-visualization-with-seaborn.md";



export async function questions(user, elementMap) {
  const results = [
    // GA1: Core Tools - JSON Wrangling
    {
      ...(await import("./q-data-transformation.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(json),
    },

    // GA1: Core Tools - Spreadsheets
    {
      ...(await import("./q-github-repository-analysis.js").then((m) => m.default({ user, weight: 0.5 }))),
      
    },

    // GA3: AI Coding - LLM Assisted Development
    {
      ...(await import("./q-excel-pivot-table-analysis.js").then((m) => m.default({ user, weight: 2 }))),
      help: md(dataTransformation),
    },

    // GA5: Web Scraping - Data Extraction
    {
      ...(await import("./q-regex-log-parsing.js").then((m) => m.default({ user, weight: 1 }))),
      help: md(webScraping),
    },

    // GA5: Web Scraping - API Parsing with Proxy
    {
      ...(await import("./q-sql-query.js.js").then((m) => m.default({ user, weight: 1 }))),
    },

    
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
