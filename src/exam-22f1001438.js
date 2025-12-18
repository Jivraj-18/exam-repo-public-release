// Exam file for roll number 22f1001438
import { displayQuestions } from "./utils/display.js";

export async function questions(user, elementMap) {
  const results = [
    // Question 1: API Data Fetching and Processing
    {
      ...(await import("./q-api-data-fetching.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [],
    },
    
    // Question 2: Correlation Analysis and Feature Selection
    {
      ...(await import("./q-correlation-analysis.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [],
    },
    
    // Question 3: Data Cleaning - Outlier Detection
    {
      ...(await import("./q-data-cleaning-outliers.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [],
    },
    
    // Question 4: LLM Prompt Engineering and Response Parsing
    {
      ...(await import("./q-llm-prompt-engineering.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [],
    },
    
    // Question 5: Regex for data validation
    {
      ...(await import("./q-regex-identifier.js").then((m) =>
        m.default({
          user,
          weight: 1,
        }),
      )),
      help: [],
    },
  ];

  // Render questions to the DOM
  displayQuestions(results, elementMap);

  // Return question data for scoring
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}