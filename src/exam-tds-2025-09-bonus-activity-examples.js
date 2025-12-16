import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

// Core Tools in Data Science (from all GA modules)
import excel from "./tds/spreadsheets.md";
import json from "./tds/json.md";
import fastapiOrders from "../questions/q-fastapi-orders.js";
import excelRegional from "../questions/q-excel-regional.js";
import analyticsCorrelation from "../questions/q-analytics-correlation.js";
import webscrapingJobs from "../questions/q-webscraping-jobs.js";
import dynamicSQL from "../questions/q-dynamic-sql.js";

export async function questions(user, elementMap) {
  const results = [
    // GA7: FastAPI – Order Processing
  {
    ...(await import("../questions/q-fastapi-orders.js")
      .then((m) => m.default({ user, elementMap }))),
  },

  // GA8: Excel – Regional Revenue
  {
    ...(await import("../questions/q-excel-regional.js")
      .then((m) => m.default({ user, elementMap }))),
  },

  // GA9: Data Analytics – Correlation
  {
    ...(await import("../questions/q-analytics-correlation.js")
      .then((m) => m.default({ user, elementMap }))),
  },

  // GA10: Web Scraping – Job Listings
  {
    ...(await import("../questions/q-webscraping-jobs.js")
      .then((m) => m.default({ user, elementMap }))),
  },

  // GA11: Dynamic SQL – Optional Filters
  {
    ...(await import("../questions/q-dynamic-sql.js")
      .then((m) => m.default({ user, elementMap }))),
  },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
