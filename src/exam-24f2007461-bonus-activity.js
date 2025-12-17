/**
 * TDS Bonus Activity - Student: 24f2007461
 * Branch: exam-24f2007461
 * Date: December 17, 2025
 * 
 * 5 Original Questions for Tools in Data Science Course
 */

import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: Pandas DataFrame Merging and Aggregation
    {
      ...(await import("./q-pandas-dataframe-merging.js").then((m) => m.default({ user, weight: 1.0 }))),
    },

    // Question 2: FastAPI Request Validation with Custom Validators
    {
      ...(await import("./q-fastapi-student-validation.js").then((m) => m.default({ user, weight: 1.2 }))),
    },

    // Question 3: Ethical Web Scraping with Rate Limiting
    {
      ...(await import("./q-ethical-web-scraping.js").then((m) => m.default({ user, weight: 1.0 }))),
    },

    // Question 4: Data Visualization Dashboard with Plotly
    {
      ...(await import("./q-plotly-visualization-dashboard.js").then((m) => m.default({ user, weight: 1.0 }))),
    },

    // Question 5: Git Collaborative Workflow Simulation
    {
      ...(await import("./q-git-collaborative-workflow.js").then((m) => m.default({ user, weight: 0.8 }))),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
