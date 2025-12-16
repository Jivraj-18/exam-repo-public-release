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
      ...(await import("./q-sort-filter-json.js").then((m) => m.default({ user, weight: 1.0 }))),
      help: md(json),
    },

    // GA1: Core Tools - Spreadsheets
    {
      ...(await import("./q-use-excel.js").then((m) => m.default({ user, weight: 0.5 }))),
      help: md(excel),
    },

    // GA3: AI Coding - LLM Assisted Development
    {
      ...(await import("./q-fastapi-coder.js").then((m) => m.default({ user, weight: 2 }))),
    },

    // GA5: Web Scraping - Data Extraction
    {
      ...(await import("./q-scrape-imdb-movies.js").then((m) => m.default({ user, weight: 1 }))),
      help: md(webScraping),
    },

    // GA5: Web Scraping - API Parsing with Proxy
    {
      ...(await import("./q-hacker-news-search.js").then((m) => m.default({ user, weight: 1 }))),
    },

    // GA6: Data Preparation - Advanced Transformation
    {
      ...(await import("./q-json-sensor-rollup.js").then((m) => m.default({ user, weight: 1 }))),
      help: md(dataTransformation),
    },

    // GA7: Data Analysis - Statistical Analysis
    {
      ...(await import("./q-python-cohort-retention.js").then((m) => m.default({ user, weight: 1.25 }))),
      help: md(pythonAnalysis),
    },

    // GA2: Deployment - Image Compression
    {
      ...(await import("./q-image-compression-dynamic.js").then((m) => m.default({ user, weight: 0.75 }))),
      help: md(imageCompression),
    },

    // GA8: Visualization - Seaborn Data Visualization
    {
      ...(await import("./q-seaborn-data-visualization.js").then((m) => m.default({ user, weight: 1.5 }))),
      help: md(visualization),
    },

    // GA4: Geospatial Analysis - Server-Side Validation
    // {
    //   ...(await import("./q-region-containing-point-server.js").then((m) => m.default({ user, weight: 2 }))),
    //   help: md(geospatial),
    // },
  ];

  results.push(
    // Roll No: 24f2007692 - Q1: Git Conflict Parser (Topic A: Git)
    {
      ...(await import("./q-git-conflict-parser.js").then((m) => m.default({ user, weight: 1 }))),
    },
    // Roll No: 24f2007692 - Q2: Docker Layer Analysis (Topic B: Docker)
    {
      ...(await import("./q-docker-layer-analysis.js").then((m) => m.default({ user, weight: 1 }))),
    },
    // Roll No: 24f2007692 - Q3: Nginx Log Stats (Topic E/A: Logs)
    {
      ...(await import("./q-nginx-log-stats.js").then((m) => m.default({ user, weight: 1 }))),
    },
    // Roll No: 24f2007692 - Q4: CSV to Markdown (Topic E/D: Data Sourcing)
    {
      ...(await import("./q-csv-to-markdown.js").then((m) => m.default({ user, weight: 1 }))),
    },
    // Roll No: 24f2007692 - Q5: SQLite Join Logic (Topic F: SQL)
    {
      ...(await import("./q-sqlite-join-logic.js").then((m) => m.default({ user, weight: 1 }))),
    }
  );


  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
