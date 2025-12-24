import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // GA1: Core Tools - CSV Parsing
    { ...(await import("./q-csv-parsing.js").then(m => m.default({ user, weight: 1 }))) },
    
    // GA2: Deployment - FastAPI Image Processing
    { ...(await import("./q-image-analysis.js").then(m => m.default({ user, weight: 1 }))) },
    
    // GA5: Web Scraping - E-Commerce Price Tracker
    { ...(await import("./q-web-scraping.js").then(m => m.default({ user, weight: 1 }))) },

    // GA6: Data Analysis - Filtering
    { ...(await import("./q-data-filtering.js").then(m => m.default({ user, weight: 1 }))) },

    // GA6: Security - Server Logs (Regex)
    { ...(await import("./q-server-log-analysis.js").then(m => m.default({ user, weight: 1 }))) },
    
    
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
