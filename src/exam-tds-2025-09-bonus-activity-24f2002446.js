import { displayQuestions } from "./utils/display.js";
import { md } from "./utils/markdown.js";

import gitBisect from "./git-bisect.md";
import langchainPlaywrightTool from "./langchain-playwright-tool.md";
import regex from "./regex.md";
import classificationAnalysis from "./classification-analysis.md";
import mermaidDiagrams from "./mermaid-diagrams.md";

export async function questions(user, elementMap) {
  const results = [
    // GA1: Developmental Tools - Git Bisect
    {
      ...(await import("./q-git-bisect.js").then((m) =>
        m.default({ user, weight: 0.5 })
      )),
      help: md(gitBisect),
    },
    // GA4: Large Language Models - Tools to Langchain
    {
      ...(await import("./q-langchain-playwright-tool.js").then((m) =>
        m.default({ user, weight: 1.75 })
      )),
      help: md(langchainPlaywrightTool),
    },
    // GA6: Data Preparation - RegEx Data Cleaning
    {
      ...(await import("./q-regex-data-cleaning.js").then((m) =>
        m.default({ user, weight: 0.5 })
      )),
      help: md(regex),
    },
    // GA7: Data Analysis - Customer Churn Prediction
    {
      ...(await import("./q-classification-analysis.js").then((m) =>
        m.default({ user, weight: 1.5 })
      )),
      help: md(classificationAnalysis),
    },
    // GA8: Data Visualisation - Mermaid diagrams
    {
      ...(await import("./q-mermaid-diagrams.js").then((m) =>
        m.default({ user, weight: 0.75 })
      )),
      help: md(mermaidDiagrams),
    },
  ];

  displayQuestions(results, elementMap);
  return Object.fromEntries(results.map(({ id, ...rest }) => [id, rest]));
}
